// Get saved passenger details

let passengerDetails = JSON.parse(
    localStorage.getItem("passengerDetails")
);


// Load saved data

window.onload = function () {

    if (!passengerDetails) {
        return;
    }


    document.getElementById("name").value =
        passengerDetails.name || "";


    document.getElementById("age").value =
        passengerDetails.age || "";


    document.getElementById("gender").value =
        passengerDetails.gender || "";


    document.getElementById("phone").value =
        passengerDetails.phone || "";


    document.getElementById("email").value =
        passengerDetails.email || "";


    document.getElementById("idType").value =
        passengerDetails.idType || "";


    document.getElementById("idNumber").value =
        passengerDetails.idNumber || "";


    document.getElementById("specialRequest").value =
        passengerDetails.specialRequest || "";


    document.getElementById("saveDetails").checked =
        passengerDetails.saveDetails || false;


    if (passengerDetails.seat) {

        document.getElementById("selectedSeat").textContent =
            "Seat " + passengerDetails.seat;

    }

};


// Form

document
    .getElementById("passengerForm")
    .addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name").value.trim();

        const age =
            document.getElementById("age").value;

        const gender =
            document.getElementById("gender").value;

        const phone =
            document.getElementById("phone").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const idType =
            document.getElementById("idType").value;

        const idNumber =
            document.getElementById("idNumber").value.trim();

        const specialRequest =
            document.getElementById("specialRequest").value.trim();

        const saveDetails =
            document.getElementById("saveDetails").checked;


        // Name validation

        if (name === "") {

            showToast("Please enter passenger name.");

            return;
        }


        // Age validation

        if (
            age === "" ||
            Number(age) < 1 ||
            Number(age) > 120
        ) {

            showToast("Please enter a valid age.");

            return;
        }


        // Gender validation

        if (gender === "") {

            showToast("Please select gender.");

            return;
        }


        // Phone validation

        if (!/^[0-9]{10}$/.test(phone)) {

            showToast(
                "Enter a valid 10-digit mobile number."
            );

            return;
        }


        // Email validation

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

            showToast("Enter a valid email address.");

            return;
        }


        // ID validation

        if (idType === "") {

            showToast("Please select ID proof.");

            return;
        }


        if (idNumber === "") {

            showToast("Please enter ID number.");

            return;
        }


        // Get old details

        const oldDetails =
            JSON.parse(
                localStorage.getItem("passengerDetails")
            ) || {};


        // Save new details

        const updatedDetails = {

            ...oldDetails,

            name: name,

            age: age,

            gender: gender,

            phone: phone,

            email: email,

            idType: idType,

            idNumber: idNumber,

            specialRequest: specialRequest,

            saveDetails: saveDetails

        };


        localStorage.setItem(
            "passengerDetails",
            JSON.stringify(updatedDetails)
        );


        // Show toast

        showToast(
            "Passenger details saved successfully!"
        );


        // Go to Step 7

        setTimeout(function () {

           window.location.href = "../payment/payment.html";

        }, 1200);

    });


// Back

function goBack() {

    window.location.href =
        "../seat-selection/seat-selection.html";

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