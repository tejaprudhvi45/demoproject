// Seat Selection


let selectedSeat = null;


// Get all seats
const seats = document.querySelectorAll(".seat.available");


// Add click event
seats.forEach(function(seat) {

    seat.addEventListener("click", function() {

        // Remove previous selection
        seats.forEach(function(item) {
            item.classList.remove("selected");
        });


        // Select clicked seat
        seat.classList.add("selected");


        selectedSeat = seat.dataset.seat;


        // Update selected seat
        document.getElementById("selectedSeat").textContent =
            "Seat " + selectedSeat;


        showToast(
            "Seat " + selectedSeat + " selected."
        );

    });

});


// Go back
function goBack() {

    window.location.href =
        "booking-details.html";

}


// Continue
function continueBooking() {

    if (selectedSeat === null) {

        showToast(
            "Please select a seat first."
        );

        return;
    }


    // Get existing passenger information
    const passengerData =
        JSON.parse(
            localStorage.getItem("passengerDetails")
        ) || {};


    // Add selected seat
    passengerData.seat = selectedSeat;


    // Save again
    localStorage.setItem(
        "passengerDetails",
        JSON.stringify(passengerData)
    );


    showToast(
        "Seat " + selectedSeat +
        " selected successfully!"
    );


    // Step 6
    setTimeout(function() {

        window.location.href =
            "passenger-details.html";

    }, 1000);

}


// Toast
function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(function() {

        toast.classList.remove("show");

    }, 2500);

}