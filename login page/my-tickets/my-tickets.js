// Get passenger data

const passengerData =
    JSON.parse(
        localStorage.getItem(
            "passengerDetails"
        )
    ) || {};


// Get booking ID

let bookingId =
    localStorage.getItem(
        "bookingId"
    );


// Create booking ID if needed

if (!bookingId) {

    bookingId =
        "TAI" +
        Date.now()
            .toString()
            .slice(-8);

    localStorage.setItem(
        "bookingId",
        bookingId
    );
}


// Display booking ID

document.getElementById(
    "bookingId"
).textContent = bookingId;


// Passenger name

if (passengerData.name) {

    document.getElementById(
        "passengerName"
    ).textContent =
        passengerData.name;

}


// Seat

if (passengerData.seat) {

    document.getElementById(
        "seatNumber"
    ).textContent =
        passengerData.seat;

}



// Tabs

function showTab(
    tabName,
    button
) {

    const sections =
        document.querySelectorAll(
            ".ticket-list, .empty-section"
        );


    sections.forEach(
        function(section) {

            section.classList.add(
                "hidden"
            );

        }
    );


    document
        .getElementById(tabName)
        .classList.remove(
            "hidden"
        );


    const tabs =
        document.querySelectorAll(
            ".tab"
        );


    tabs.forEach(
        function(tab) {

            tab.classList.remove(
                "active"
            );

        }
    );


    button.classList.add(
        "active"
    );

}



// View ticket

function viewTicket() {

    window.location.href =
       "../booking-confirm/booking-confirmation.html";

}



// Download ticket

function downloadTicket() {

    showToast(
        "Preparing your ticket..."
    );


    setTimeout(
        function() {

            window.print();

        },
        800
    );

}



// Show QR

function showQR() {

    document
        .getElementById(
            "qrModal"
        )
        .classList.add(
            "show"
        );

}



// Close QR

function closeQR() {

    document
        .getElementById(
            "qrModal"
        )
        .classList.remove(
            "show"
        );

}



// Book new ticket

function bookNewTicket() {

    window.location.href =
         "../ticket/ticket-results.html";

}



// Toast

function showToast(
    message
) {

    const toast =
        document.getElementById(
            "toast"
        );


    toast.querySelector(
        "span"
    ).textContent = message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2500
    );

}



// Close modal when clicking outside

document
    .getElementById("qrModal")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target === this
            ) {

                closeQR();

            }

        }
    );