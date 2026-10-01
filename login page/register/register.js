const API_URL = "https://cautious-space-spork-gxr6pvwrqxgp3j5x-5000.app.github.dev";
const registerForm = document.getElementById("registerForm");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

const message = document.getElementById("message");
const registerButton = document.getElementById("registerButton");

const buttonText = document.getElementById("buttonText");
const loader = document.getElementById("loader");


function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
}


function setLoading(loading) {

    registerButton.disabled = loading;

    if (loading) {
        buttonText.textContent = "Creating Account...";
        loader.classList.remove("hidden");
    } else {
        buttonText.textContent = "Create Account";
        loader.classList.add("hidden");
    }
}


passwordInput.addEventListener("input", () => {

    passwordInput.value =
        passwordInput.value.replace(/\D/g, "").slice(0, 6);

});


confirmPasswordInput.addEventListener("input", () => {

    confirmPasswordInput.value =
        confirmPasswordInput.value.replace(/\D/g, "").slice(0, 6);

});


registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    showMessage("", "");

    if (!/^\d{6}$/.test(password)) {
        showMessage(
            "Password must be exactly 6 digits.",
            "error"
        );
        return;
    }

    if (password !== confirmPassword) {
        showMessage(
            "Passwords do not match.",
            "error"
        );
        return;
    }

    setLoading(true);

    try {

        const response = await fetch(
            `${API_URL}/api/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    password: password
                })
            }
        );

        const data = await response.json();

        if (!response.ok) {
            showMessage(
                data.message || "Registration failed.",
                "error"
            );

            setLoading(false);
            return;
        }

        showMessage(
            `Registration successful! Your User ID is ${data.userId}`,
            "success"
        );

        registerForm.reset();

        setTimeout(() => {

            window.location.href =
                `../login/index.html?registered=true&userId=${encodeURIComponent(data.userId)}`;

        }, 2500);

    } catch (error) {

        console.error("Registration error:", error);

        showMessage(
            "Unable to connect to the server.",
            "error"
        );

        setLoading(false);
    }
});
