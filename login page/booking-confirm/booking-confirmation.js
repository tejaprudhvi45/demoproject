// Get passenger information

const bookingData = JSON.parse(
    localStorage.getItem("passengerDetails")
) || {};


// Generate booking ID

let bookingId = localStorage.getItem(
    "bookingId"
);

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

if (bookingData.name) {

    document.getElementById(
        "passengerName"
    ).textContent = bookingData.name;

}


// Seat

if (bookingData.seat) {

    document.getElementById(
        "seatNumber"
    ).textContent = bookingData.seat;

}


// Gender

if (bookingData.gender) {

    document.getElementById(
        "gender"
    ).textContent = bookingData.gender;

}


// Phone

if (bookingData.phone) {

    const phone =
        bookingData.phone;

    const masked =
        "******" +
        phone.slice(-4);

    document.getElementById(
        "phone"
    ).textContent = masked;

}


// Copy booking ID

function copyBookingId() {

    navigator.clipboard.writeText(
        bookingId
    );

    showToast(
        "Booking ID copied!"
    );

}


// Download ticket

function downloadTicket() {

    showToast(
        "Ticket download started!"
    );

    setTimeout(function () {

        window.print();

    }, 700);

}


// Dashboard

function goToDashboard() {

    window.location.href =
        "../document/dashboard.html";

}


// Toast

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );

    toast.querySelector(
        "span"
    ).textContent = message;

    toast.classList.add("show");


    setTimeout(function () {

        toast.classList.remove(
            "show"
        );

    }, 2500);

}
// My Tickets

function goToMyTickets() {

    window.location.href =
        "../my-tickets/my-tickets.html";

}