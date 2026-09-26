// Booking Details JavaScript


// Go back to ticket results
function goBack() {
    window.location.href = "ticket-results.html";
}


// Change seat
function changeSeat() {

    showToast("Seat selection will open in the next step.");

}


// Continue booking
function continueBooking() {

    const name =
        document.getElementById("passengerName").value.trim();

    const age =
        document.getElementById("age").value.trim();

    const gender =
        document.getElementById("gender").value;

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();


    // Validate name
    if (name === "") {

        showToast("Please enter passenger name.");

        document.getElementById("passengerName").focus();

        return;
    }


    // Validate age
    if (age === "" || age < 1 || age > 120) {

        showToast("Please enter a valid age.");

        document.getElementById("age").focus();

        return;
    }


    // Validate gender
    if (gender === "") {

        showToast("Please select gender.");

        document.getElementById("gender").focus();

        return;
    }


    // Validate phone
    if (!/^[0-9]{10}$/.test(phone)) {

        showToast("Please enter a valid 10-digit mobile number.");

        document.getElementById("phone").focus();

        return;
    }


    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        showToast("Please enter a valid email address.");

        document.getElementById("email").focus();

        return;
    }


    // Save passenger information
    const passengerDetails = {

        name: name,
        age: age,
        gender: gender,
        phone: phone,
        email: email,

        seat: "12A",

        journey: {
            from: "Hyderabad",
            to: "Bengaluru",
            date: "28 September 2026"
        },

        totalAmount: 1002

    };


    localStorage.setItem(
        "passengerDetails",
        JSON.stringify(passengerDetails)
    );


    showToast("Details saved successfully!");


    // Continue after short delay
    setTimeout(function () {

        // Step 5 page
        window.location.href = "seat-selection.html";

    }, 1200);

}


// Toast message
function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove("show");

    }, 3000);

}