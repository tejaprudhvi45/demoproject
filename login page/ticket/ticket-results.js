const params = new URLSearchParams(window.location.search);

const from = params.get("from") || "Hyderabad";
const to = params.get("to") || "Bangalore";
const transport = params.get("transport") || "train";
const selectedDate = params.get("date");
const passengers = Number(params.get("passengers")) || 1;

const fromLocation = document.getElementById("fromLocation");
const toLocation = document.getElementById("toLocation");
const travelDate = document.getElementById("travelDate");
const transportType = document.getElementById("transportType");
const passengerCount = document.getElementById("passengerCount");
const resultCount = document.getElementById("resultCount");
const ticketList = document.getElementById("ticketList");

fromLocation.textContent = formatLocation(from);
toLocation.textContent = formatLocation(to);

transportType.textContent =
    formatTransport(transport);

passengerCount.textContent =
    passengers;

travelDate.textContent =
    formatDate(selectedDate);

const tickets = [
    {
        icon: "🚆",
        name: "Rajdhani Express",
        number: "Train 12723",
        departure: "06:15 AM",
        arrival: "02:30 PM",
        duration: "8h 15m",
        from: from,
        to: to,
        price: 1250,
        seats: 2
    },
    {
        icon: "🚆",
        name: "Duronto Express",
        number: "Train 12245",
        departure: "08:10 AM",
        arrival: "04:40 PM",
        duration: "8h 30m",
        from: from,
        to: to,
        price: 1100,
        seats: 5
    },
    {
        icon: "🚆",
        name: "Intercity Express",
        number: "Train 12785",
        departure: "02:30 PM",
        arrival: "11:05 PM",
        duration: "8h 35m",
        from: from,
        to: to,
        price: 850,
        seats: 8
    }
];

renderTickets(tickets);

function renderTickets(ticketData) {

    ticketList.innerHTML = "";

    if (ticketData.length === 0) {

        ticketList.innerHTML = `
            <div class="empty-state">
                <h3>No tickets found</h3>
                <p>
                    Try changing your travel date or route.
                </p>
            </div>
        `;

        resultCount.textContent = "0 options";

        return;
    }

    resultCount.textContent =
        `${ticketData.length} options`;

    ticketData.forEach((ticket, index) => {

        const totalPrice =
            ticket.price * passengers;

        const card = document.createElement("div");

        card.className = "ticket-card";

        card.innerHTML = `
            <div class="ticket-top">

                <div class="train-info">

                    <div class="transport-icon">
                        ${ticket.icon}
                    </div>

                    <div>
                        <div class="train-name">
                            ${ticket.name}
                        </div>

                        <div class="train-number">
                            ${ticket.number}
                        </div>
                    </div>

                </div>

                <div class="availability">
                    ${ticket.seats} Seats Available
                </div>

            </div>

            <div class="ticket-middle">

                <div class="time-box">

                    <span class="time">
                        ${ticket.departure}
                    </span>

                    <span class="station">
                        ${formatLocation(ticket.from)}
                    </span>

                </div>

                <div class="duration">

                    <span>
                        ${ticket.duration}
                    </span>

                    <div class="duration-line">
                        <div></div>
                        <span>●</span>
                        <div></div>
                    </div>

                </div>

                <div class="time-box">

                    <span class="time">
                        ${ticket.arrival}
                    </span>

                    <span class="station">
                        ${formatLocation(ticket.to)}
                    </span>

                </div>

            </div>

            <div class="ticket-bottom">

                <div class="price">

                    <span>
                        Price for ${passengers}
                        passenger${passengers > 1 ? "s" : ""}
                    </span>

                    <strong>
                        ₹${totalPrice.toLocaleString("en-IN")}
                    </strong>

                </div>

                <div class="ticket-actions">

                    <button
                        class="details-button"
                        onclick="viewDetails(${index})"
                    >
                        View Details
                    </button>

                    <button
                        class="book-button"
                        onclick="bookTicket(${index})"
                    >
                        Book Now
                    </button>

                </div>

            </div>
        `;

        ticketList.appendChild(card);
    });
}

function viewDetails(index) {

    const ticket = tickets[index];

    showToast(
        `${ticket.name} • ${ticket.departure} departure`
    );
}

function bookTicket(index) {

    const ticket = tickets[index];

    const bookingData = {
        from: from,
        to: to,
        transport: transport,
        date: selectedDate,
        passengers: passengers,
        ticket: ticket.name,
        trainNumber: ticket.number,
        departure: ticket.departure,
        arrival: ticket.arrival,
        price: ticket.price * passengers
    };

    sessionStorage.setItem(
        "selectedTicket",
        JSON.stringify(bookingData)
    );

    showToast(
        `${ticket.name} selected for booking`
    );

    setTimeout(() => {

        window.location.href =
            "booking.html";

    }, 1000);
}

function goBack() {

    window.location.href =
        "dashboard.html";
}

function showFilterMessage() {

    showToast(
        "Advanced filters will be added next."
    );
}

function formatLocation(value) {

    if (!value) {
        return "";
    }

    return value
        .split(" ")
        .map(word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
        )
        .join(" ");
}

function formatTransport(value) {

    const names = {
        train: "Train",
        flight: "Flight",
        bus: "Bus",
        movie: "Movie"
    };

    return names[value] || "Train";
}

function formatDate(value) {

    if (!value) {
        return "28 September 2026";
    }

    const date = new Date(value + "T00:00:00");

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );
}

let toastTimer;

function showToast(message) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent =
        message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);
}