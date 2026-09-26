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


loginForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const passwordValue =
            password.value.trim();

        if (!email || !passwordValue) {

            showToast(
                "Please enter your email and password.",
                false
            );

            return;
        }

        loginButton.classList.add("loading");

        loginButton.disabled = true;

        setTimeout(() => {

            loginButton.classList.remove("loading");

            loginButton.disabled = false;

            window.location.href = "dashboard.html";

        }, 1800);

    }
);


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