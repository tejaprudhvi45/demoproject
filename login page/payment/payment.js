// Get saved passenger details

const passengerDetails = JSON.parse(
    localStorage.getItem("passengerDetails")
);


// Payment methods

const paymentMethods =
    document.querySelectorAll(".payment-method");

const paymentForms =
    document.querySelectorAll(".payment-form");


paymentMethods.forEach(function (button) {

    button.addEventListener("click", function () {

        const method =
            button.getAttribute("data-method");


        // Remove active class

        paymentMethods.forEach(function (item) {

            item.classList.remove("active");

        });


        paymentForms.forEach(function (form) {

            form.classList.remove("active");

        });


        // Activate selected method

        button.classList.add("active");


        if (method === "upi") {

            document
                .getElementById("upiForm")
                .classList.add("active");

        }


        if (method === "card") {

            document
                .getElementById("cardForm")
                .classList.add("active");

        }


        if (method === "netbanking") {

            document
                .getElementById("netbankingForm")
                .classList.add("active");

        }

    });

});


// Back button

function goBack() {

    window.location.href =
        "passenger-details.html";

}


// Process payment

function processPayment() {

    const activeMethod =
        document.querySelector(
            ".payment-method.active"
        );


    const method =
        activeMethod.getAttribute("data-method");


    // UPI validation

    if (method === "upi") {

        const upi =
            document.getElementById("upiId")
                .value
                .trim();


        if (upi === "") {

            showToast(
                "Please enter your UPI ID."
            );

            return;
        }


        if (!upi.includes("@")) {

            showToast(
                "Please enter a valid UPI ID."
            );

            return;
        }

    }


    // Card validation

    if (method === "card") {

        const cardNumber =
            document.getElementById("cardNumber")
                .value
                .trim();

        const expiry =
            document.getElementById("expiry")
                .value
                .trim();

        const cvv =
            document.getElementById("cvv")
                .value
                .trim();

        const cardName =
            document.getElementById("cardName")
                .value
                .trim();


        if (
            cardNumber === "" ||
            expiry === "" ||
            cvv === "" ||
            cardName === ""
        ) {

            showToast(
                "Please enter all card details."
            );

            return;
        }

    }


    // Net banking validation

    if (method === "netbanking") {

        const bank =
            document.getElementById("bank").value;


        if (bank === "") {

            showToast(
                "Please select your bank."
            );

            return;
        }

    }


    // Save payment method

    const booking =
        JSON.parse(
            localStorage.getItem("passengerDetails")
        ) || {};


    booking.paymentMethod = method;

    booking.amount = 930;

    booking.paymentStatus = "Paid";


    localStorage.setItem(
        "passengerDetails",
        JSON.stringify(booking)
    );


    // Show success

    showToast(
        "Payment successful! Redirecting..."
    );


    // Step 8

    setTimeout(function () {

        window.location.href =
            "../booking-confirm/booking-confirmation.html";

    }, 1500);

}


// Toast

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.querySelector("span").textContent =
        message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 2500);

}