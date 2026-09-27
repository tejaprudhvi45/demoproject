const loginForm =
    document.getElementById("loginForm");

const loginButton =
    document.getElementById("loginButton");

const password =
    document.getElementById("password");

const passwordToggle =
    document.getElementById("passwordToggle");

const voiceButton =
    document.getElementById("voiceButton");

const forgotPassword =
    document.getElementById("forgotPassword");

const registerLink =
    document.getElementById("registerLink");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");


passwordToggle.addEventListener(
    "click",
    () => {

        if (password.type === "password") {

            password.type = "text";

            passwordToggle.textContent = "🙈";

            passwordToggle.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            password.type = "password";

            passwordToggle.textContent = "👁";

            passwordToggle.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userId = document.getElementById("userId").value.trim();
    const passwordValue = password.value.trim();

    if (!userId || !passwordValue) {
        showToast("Please enter your User ID and password.", false);
        return;
    }

    if (!/^\d{6}$/.test(passwordValue)) {
        showToast("Password must be exactly 6 digits.", false);
        return;
    }

    loginButton.classList.add("loading");
    loginButton.disabled = true;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                password: passwordValue
            })
        });

        const data = await response.json();

        if (!response.ok) {
            showToast(data.message || "Login failed.", false);
            return;
        }

        localStorage.setItem("ticketAI_token", data.token);
        localStorage.setItem("ticketAI_userId", data.user.userId);

        showToast("Login successful!", true);

        setTimeout(() => {
            window.location.href = "../document/dashboard.html";
        }, 1000);

    } catch (error) {
        console.log("Login error:", error);
        showToast("Unable to connect to server.", false);

    } finally {
        loginButton.classList.remove("loading");
        loginButton.disabled = false;
    }
});

voiceButton.addEventListener(
    "click",
    () => {

        showToast(
            "Voice assistant will be available here.",
            true
        );

    }
);


forgotPassword.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        showToast(
            "Password recovery will be added soon.",
            true
        );

    }
);


registerLink.addEventListener(
    "click",
    (event) => {

        event.preventDefault();

        showToast(
            "Registration page will be added soon.",
            true
        );

    }
);


let toastTimer;


function showToast(message, success = true) {

    clearTimeout(toastTimer);

    toastMessage.textContent = message;

    const icon =
        document.querySelector(".toast-icon");

    icon.textContent =
        success ? "✓" : "!";

    icon.style.background =
        success ? "#22c55e" : "#ef4444";

    toast.classList.add("show");

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}