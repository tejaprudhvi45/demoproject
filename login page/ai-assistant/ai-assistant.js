const chatBox =
    document.getElementById("chatBox");

const input =
    document.getElementById("messageInput");


// Send message

function sendMessage() {

    const message =
        input.value.trim();


    if (message === "") {
        return;
    }


    addUserMessage(message);


    input.value = "";


    showTyping();


    setTimeout(
        function() {

            removeTyping();

            generateResponse(message);

        },
        900
    );

}



// Quick message

function quickMessage(message) {

    input.value = message;

    sendMessage();

}



// Add user message

function addUserMessage(message) {

    const div =
        document.createElement("div");


    div.className =
        "message user-message";


    div.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-user"></i>

        </div>


        <div class="message-content">

            <div class="bubble">

                ${escapeHTML(message)}

            </div>

        </div>

    `;


    chatBox.appendChild(div);


    scrollChat();

}



// Add AI message

function addAIMessage(message) {

    const div =
        document.createElement("div");


    div.className =
        "message ai-message";


    div.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message-name">

                Ticket AI

            </div>


            <div class="bubble">

                ${message}

            </div>

        </div>

    `;


    chatBox.appendChild(div);


    scrollChat();

}



// AI response

function generateResponse(message) {

    const text =
        message.toLowerCase();


    if (
        text.includes("ticket") ||
        text.includes("booking")
    ) {

        addAIMessage(`

            You can view your bookings from
            <strong>My Tickets</strong>.

            <br><br>

            Your current booking is:

            <br>

            🚌 Hyderabad → Bengaluru

            <br>

            📅 28 September 2026

            <br>

            💺 Your selected seat is saved
            with your booking.

        `);

        return;
    }



    if (
        text.includes("seat")
    ) {

        const data =
            JSON.parse(
                localStorage.getItem(
                    "passengerDetails"
                )
            ) || {};


        const seat =
            data.seat || "12A";


        addAIMessage(`

            Your selected seat is

            <br><br>

            <strong style="font-size:18px;color:#6366f1;">
                Seat ${seat}
            </strong>

            <br><br>

            You can check the complete
            ticket from My Tickets.

        `);

        return;
    }



    if (
        text.includes("bus") ||
        text.includes("route") ||
        text.includes("hyderabad") ||
        text.includes("bengaluru")
    ) {

        addAIMessage(`

            I can help you find buses
            between cities.

            <br><br>

            For your current journey:

            <br>

            📍 Hyderabad

            →

            Bengaluru

            <br><br>

            Open the booking section to
            explore available buses.

        `);

        return;
    }



    if (
        text.includes("price") ||
        text.includes("fare") ||
        text.includes("cost")
    ) {

        addAIMessage(`

            Your current sample booking
            has a total fare of:

            <br><br>

            <strong style="font-size:20px;color:#6366f1;">
                ₹930
            </strong>

            <br><br>

            The final fare can vary depending
            on the selected bus, seat and
            applicable charges.

        `);

        return;
    }



    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        addAIMessage(`

            Hello! 👋

            <br><br>

            I'm ready to help you with
            your Ticket AI journey.

            <br><br>

            Try asking:

            <br>

            "Show my tickets"

            <br>

            "What is my seat?"

            <br>

            "Find a bus"

        `);

        return;
    }



    addAIMessage(`

        I'm here to help with your travel
        and ticket information. 🤖

        <br><br>

        You can ask me about:

        <br>

        🎫 Your tickets

        <br>

        🚌 Bus routes

        <br>

        💺 Seats

        <br>

        💰 Fare information

        <br><br>

        Try one of the quick questions
        below.

    `);

}



// Typing indicator

function showTyping() {

    const typing =
        document.createElement("div");


    typing.id =
        "typingIndicator";


    typing.className =
        "message ai-message";


    typing.innerHTML = `

        <div class="message-avatar">

            <i class="fa-solid fa-robot"></i>

        </div>


        <div class="message-content">

            <div class="message-name">
                Ticket AI
            </div>


            <div class="bubble">

                <i class="fa-solid fa-circle"
                   style="font-size:5px"></i>

                <i class="fa-solid fa-circle"
                   style="font-size:5px"></i>

                <i class="fa-solid fa-circle"
                   style="font-size:5px"></i>

                &nbsp; Thinking...

            </div>

        </div>

    `;


    chatBox.appendChild(typing);


    scrollChat();

}



// Remove typing

function removeTyping() {

    const typing =
        document.getElementById(
            "typingIndicator"
        );


    if (typing) {

        typing.remove();

    }

}



// Scroll chat

function scrollChat() {

    chatBox.scrollTop =
        chatBox.scrollHeight;

}



// Enter key

function handleKey(event) {

    if (
        event.key === "Enter"
    ) {

        sendMessage();

    }

}



// New chat

function clearChat() {

    chatBox.innerHTML = `

        <div class="message ai-message">

            <div class="message-avatar">

                <i class="fa-solid fa-robot"></i>

            </div>


            <div class="message-content">

                <div class="message-name">
                    Ticket AI
                </div>


                <div class="bubble">

                    New conversation started! 👋

                    <br><br>

                    How can I help you with
                    your travel today?

                </div>

            </div>

        </div>


        <div class="quick-section">

            <span>
                Quick questions
            </span>


            <div class="quick-buttons">

                <button
                    onclick="quickMessage('Show my tickets')"
                >

                    <i class="fa-solid fa-ticket"></i>

                    My tickets

                </button>


                <button
                    onclick="quickMessage('Find buses from Hyderabad to Bengaluru')"
                >

                    <i class="fa-solid fa-bus"></i>

                    Find a bus

                </button>


                <button
                    onclick="quickMessage('What is my seat number?')"
                >

                    <i class="fa-solid fa-chair"></i>

                    My seat

                </button>


                <button
                    onclick="quickMessage('What is my booking status?')"
                >

                    <i class="fa-solid fa-circle-check"></i>

                    Booking status

                </button>

            </div>

        </div>

    `;


    showToast(
        "New chat started"
    );

}



// Escape HTML

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

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


    setTimeout(
        function() {

            toast.classList.remove(
                "show"
            );

        },
        2200
    );

}