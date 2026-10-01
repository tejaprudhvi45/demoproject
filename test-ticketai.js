const fs = require("fs");
const path = require("path");
const https = require("https");

const ROOT = __dirname;

const BACKEND_URL =
    "https://cautious-space-spork-gxr6pvwrqxgp3j5x-5000.app.github.dev";
let passed = 0;
let failed = 0;
let warnings = 0;

function pass(message) {
    console.log(`  ✓ ${message}`);
    passed++;
}

function fail(message) {
    console.log(`  ✗ ${message}`);
    failed++;
}

function warn(message) {
    console.log(`  ! ${message}`);
    warnings++;
}

function section(title) {
    console.log("\n" + "═".repeat(60));
    console.log(`  ${title}`);
    console.log("═".repeat(60));
}

function fileExists(relativePath) {
    return fs.existsSync(path.join(ROOT, relativePath));
}

function checkFile(relativePath) {
    if (fileExists(relativePath)) {
        pass(relativePath);
    } else {
        fail(`Missing: ${relativePath}`);
    }
}

function request(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, (res) => {
            let data = "";

            res.on("data", chunk => {
                data += chunk;
            });

            res.on("end", () => {
                resolve({
                    status: res.statusCode,
                    data
                });
            });
        });

        req.on("error", reject);
    });
}

const frontendFiles = [
    "login page/login/index.html",
    "login page/login/style.css",
    "login page/login/script.js",

    "login page/document/dashboard.html",
    "login page/document/dashboard.css",
    "login page/document/dashboard.js",

    "login page/ticket/ticket-results.html",
    "login page/ticket/ticket-results.css",
    "login page/ticket/ticket-results.js",

    "login page/booking/booking-details.html",
    "login page/booking/booking-details.css",
    "login page/booking/booking-details.js",

    "login page/passenger/passenger-details.html",
    "login page/passenger/passenger-details.css",
    "login page/passenger/passenger-details.js",

    "login page/payment/payment.html",
    "login page/payment/payment.css",
    "login page/payment/payment.js",

    "login page/seat-selection/seat-selection.html",
    "login page/seat-selection/seat-selection.css",
    "login page/seat-selection/seat-selection.js",

    "login page/booking-confirm/booking-confirmation.html",
    "login page/booking-confirm/booking-confirmation.css",
    "login page/booking-confirm/booking-confirmation.js",

    "login page/my-tickets/my-tickets.html",
    "login page/my-tickets/my-tickets.css",
    "login page/my-tickets/my-tickets.js",

    "login page/ai-assistant/ai-assistant.html",
    "login page/ai-assistant/ai-assistant.css",
    "login page/ai-assistant/ai-assistant.js"
];

function testBackendFiles() {
    section("BACKEND FILE TEST");

    [
        "backend/server.js",
        "backend/package.json",
        "backend/models/User.js",
        "backend/models/Ticket.js",
        "backend/routes/authRoutes.js",
        "backend/routes/ticketRoutes.js"
    ].forEach(checkFile);
}

function testFrontendFiles() {
    section("FRONTEND FILE TEST");

    frontendFiles.forEach(checkFile);
}

function testHTMLReferences() {
    section("HTML REFERENCE TEST");

    const htmlFiles = frontendFiles.filter(file =>
        file.endsWith(".html")
    );

    htmlFiles.forEach(relativePath => {
        const fullPath = path.join(ROOT, relativePath);

        if (!fs.existsSync(fullPath)) {
            return;
        }

        const html = fs.readFileSync(fullPath, "utf8");

        const references = [];

        for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
            references.push(match[1]);
        }

        for (const match of html.matchAll(/src=["']([^"']+)["']/gi)) {
            references.push(match[1]);
        }

        let broken = 0;

        references.forEach(reference => {
            if (
                reference.startsWith("http://") ||
                reference.startsWith("https://") ||
                reference.startsWith("#") ||
                reference.startsWith("data:")
            ) {
                return;
            }

            const cleanReference = reference.split("?")[0];

            const target = path.resolve(
                path.dirname(fullPath),
                cleanReference
            );

            if (!fs.existsSync(target)) {
                fail(`${relativePath} → missing ${cleanReference}`);
                broken++;
            }
        });

        if (broken === 0) {
            pass(`${relativePath} references are valid`);
        }
    });
}

function testAPIURLs() {
    section("FRONTEND API URL TEST");

    const jsFiles = frontendFiles.filter(file =>
        file.endsWith(".js")
    );

    let localhostFound = false;
    let codespacesFound = false;

    jsFiles.forEach(relativePath => {
        const fullPath = path.join(ROOT, relativePath);

        if (!fs.existsSync(fullPath)) {
            return;
        }

        const content = fs.readFileSync(fullPath, "utf8");

        if (content.includes("localhost:5000")) {
            fail(`${relativePath} still contains localhost:5000`);
            localhostFound = true;
        }

        if (content.includes("app.github.dev")) {
            pass(`${relativePath} contains Codespaces URL`);
            codespacesFound = true;
        }
    });

    if (!localhostFound) {
        pass("No frontend JavaScript uses localhost:5000");
    }

    if (!codespacesFound) {
        warn("No Codespaces backend URL found");
    }
}

async function testBackend() {
    section("BACKEND CONNECTION TEST");

    try {
        const result = await request(BACKEND_URL);

        if (result.status >= 200 && result.status < 300) {
            pass(`Backend reachable - HTTP ${result.status}`);
        } else {
            fail(`Backend returned HTTP ${result.status}`);
        }

        try {
            const data = JSON.parse(result.data);

            if (data.message === "TicketAI Backend is running") {
                pass("Backend root endpoint is working");
            } else {
                warn("Unexpected backend response");
            }
        } catch {
            fail("Backend returned invalid JSON");
        }

    } catch (error) {
        fail("Cannot connect to backend");
        console.log(`     ${error.message}`);
    }
}

function testLoginCode() {
    section("LOGIN CODE TEST");

    const loginFile =
        path.join(ROOT, "login page/login/script.js");

    if (!fs.existsSync(loginFile)) {
        fail("Login script.js is missing");
        return;
    }

    const content = fs.readFileSync(loginFile, "utf8");

    if (content.includes("/api/auth/login")) {
        pass("Login API endpoint exists");
    } else {
        fail("Login API endpoint not found");
    }

    if (content.includes("ticketAI_token")) {
        pass("JWT token is stored after login");
    } else {
        warn("JWT token storage not found");
    }

    if (content.includes("ticketAI_userId")) {
        pass("User ID is stored after login");
    } else {
        warn("User ID storage not found");
    }
}

function printSummary() {
    section("FINAL RESULT");

    console.log(`  Passed   : ${passed}`);
    console.log(`  Failed   : ${failed}`);
    console.log(`  Warnings : ${warnings}`);

    console.log("\n" + "─".repeat(60));

    if (failed === 0) {
        console.log("  ✓ TICKETAI PROJECT TEST PASSED");
    } else {
        console.log("  ✗ TICKETAI PROJECT TEST FOUND PROBLEMS");
    }

    console.log("─".repeat(60));
}

async function main() {
    console.log("\n");
    console.log("╔════════════════════════════════════════════════════════════╗");
    console.log("║                 TICKETAI PROJECT TESTER                  ║");
    console.log("╚════════════════════════════════════════════════════════════╝");

    console.log(`\nProject: ${ROOT}`);
    console.log(`Backend: ${BACKEND_URL}`);

    testBackendFiles();
    testFrontendFiles();
    testHTMLReferences();
    testAPIURLs();
    testLoginCode();

    await testBackend();

    printSummary();
}

main();
