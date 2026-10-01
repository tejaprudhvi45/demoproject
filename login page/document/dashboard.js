/* =========================================
   ELEMENTS
========================================= */

const micButton =
    document.getElementById("micButton");

const voiceStatusText =
    document.getElementById("voiceStatusText");

const voiceStatus =
    document.getElementById("voiceStatus");

const chat =
    document.getElementById("chat");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const clearChat =
    document.getElementById("clearChat");

const searchButton =
    document.getElementById("searchButton");

const fromLocation =
    document.getElementById("fromLocation");

const toLocation =
    document.getElementById("toLocation");

const travelDate =
    document.getElementById("travelDate");

const swapButton =
    document.getElementById("swapButton");

const passengerCount =
    document.getElementById("passengerCount");

const minusPassenger =
    document.getElementById("minusPassenger");

const plusPassenger =
    document.getElementById("plusPassenger");

const recentList =
    document.getElementById("recentList");

const clearRecent =
    document.getElementById("clearRecent");

const logoutButton =
    document.getElementById("logoutButton");

const profileButton =
    document.getElementById("profileButton");

const profileMenu =
    document.getElementById("profileMenu");

const toast =
    document.getElementById("toast");

const toastMessage =
    document.getElementById("toastMessage");

const toastIcon =
    document.getElementById("toastIcon");

const transportButtons =
    document.querySelectorAll(".transport");

const commands =
    document.querySelectorAll(".command");


/* =========================================
   STATE
========================================= */

let passengers = 1;

let selectedTransport = "train";

let recognition = null;

let isListening = false;

let toastTimer;


/* =========================================
   DEFAULT DATE
========================================= */

const today =
    new Date();

const year =
    today.getFullYear();

const month =
    String(today.getMonth() + 1)
        .padStart(2, "0");

const day =
    String(today.getDate())
        .padStart(2, "0");

const todayString =
    `${year}-${month}-${day}`;

travelDate.min =
    todayString;

travelDate.value =
    todayString;


/* =========================================
   TRANSPORT SELECTION
========================================= */

transportButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            transportButtons.forEach(
                item => {
                    item.classList.remove(
                        "active"
                    );
                }
            );

            button.classList.add(
                "active"
            );

            selectedTransport =
                button.dataset.type;

            showToast(
                `${capitalize(selectedTransport)} selected.`,
                true
            );

        }
    );

});


/* =========================================
   PASSENGER COUNTER
========================================= */

plusPassenger.addEventListener(
    "click",
    () => {

        if (passengers < 10) {

            passengers++;

            updatePassengerCount();

        }

    }
);


minusPassenger.addEventListener(
    "click",
    () => {

        if (passengers > 1) {

            passengers--;

            updatePassengerCount();

        }

    }
);


function updatePassengerCount() {

    passengerCount.textContent =
        passengers;

}


/* =========================================
   SWAP LOCATIONS
========================================= */

swapButton.addEventListener(
    "click",
    () => {

        const temp =
            fromLocation.value;

        fromLocation.value =
            toLocation.value;

        toLocation.value =
            temp;

    }
);


/* =========================================
   SEARCH TICKETS
========================================= */

searchButton.addEventListener(
    "click",
    searchTickets
);

function searchTickets() {

    const from =
        fromLocation.value.trim();

    const to =
        toLocation.value.trim();

    const date =
        travelDate.value;


    if (!from || !to) {

        showToast(
            "Please enter departure and destination.",
            false
        );

        return;
    }


    if (
        from.toLowerCase() ===
        to.toLowerCase()
    ) {

        showToast(
            "Departure and destination cannot be the same.",
            false
        );

        return;
    }


    if (!date) {

        showToast(
            "Please select a travel date.",
            false
        );

        return;
    }


    const params =
        new URLSearchParams();


    params.set(
        "from",
        from
    );


    params.set(
        "to",
        to
    );


    params.set(
        "transport",
        selectedTransport
    );


    params.set(
        "date",
        date
    );


    params.set(
        "passengers",
        passengers
    );


   window.location.href =
    `../ticket/ticket-results.html?${params.toString()}`;

}

/* =========================================
   CHAT MESSAGE
========================================= */

sendButton.addEventListener(
    "click",
    sendMessage
);


messageInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);


function sendMessage() {

    const message =
        messageInput.value.trim();

    if (!message) {
        return;
    }


    addChatMessage(
        "user",
        message
    );


    messageInput.value = "";


    setTimeout(() => {

        const response =
            generateAIResponse(message);

        addChatMessage(
            "ai",
            response
        );

    }, 700);

}


/* =========================================
   AI RESPONSE
========================================= */

function generateAIResponse(message) {

    const lower =
        message.toLowerCase();


    if (
        lower.includes("train") ||
        lower.includes("railway")
    ) {

        return "Sure! I can help you find a train. Please provide your departure city, destination and travel date.";

    }


    if (
        lower.includes("flight") ||
        lower.includes("plane")
    ) {

        return "Sure! Let's find a flight. Tell me your departure city, destination and travel date.";

    }


    if (
        lower.includes("bus")
    ) {

        return "Sure! I can help you find a bus. Tell me where you're travelling from and where you'd like to go.";

    }


    if (
        lower.includes("movie") ||
        lower.includes("cinema")
    ) {

        return "Sure! Tell me the movie and city, and I'll help you find available shows.";

    }


    if (
        lower.includes("hyderabad") &&
        lower.includes("delhi")
    ) {

        fromLocation.value =
            "Hyderabad";

        toLocation.value =
            "Delhi";

        return "I've set your journey from Hyderabad to Delhi. Now select your travel date.";

    }


    if (
        lower.includes("mumbai")
    ) {

        toLocation.value =
            "Mumbai";

        return "I've set Mumbai as your destination. What city are you travelling from?";

    }


    if (
        lower.includes("bangalore") ||
        lower.includes("bengaluru")
    ) {

        toLocation.value =
            "Bangalore";

        return "I've set Bangalore as your destination. What city are you travelling from?";

    }


    if (
        lower.includes("hello") ||
        lower.includes("hi")
    ) {

        return "Hello! 👋 Where would you like to travel today?";

    }


    if (
        lower.includes("book")
    ) {

        return "Absolutely! I can help you book a ticket. Tell me your transport type, departure city and destination.";

    }


    return "I understand. Tell me your travel details, for example: 'Book a train from Hyderabad to Delhi tomorrow.'";

}


/* =========================================
   ADD CHAT MESSAGE
========================================= */

function addChatMessage(
    type,
    message
) {

    const messageElement =
        document.createElement("div");


    messageElement.className =
        type === "ai"
            ? "message ai-message"
            : "message user-message";


    const avatar =
        type === "ai"
            ? "✦"
            : "👤";


    const name =
        type === "ai"
            ? "TicketAI"
            : "You";


    messageElement.innerHTML =
        `
        <div class="message-avatar">
            ${avatar}
        </div>

        <div class="message-content">

            <span class="message-name">
                ${name}
            </span>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>
        `;


    chat.appendChild(
        messageElement
    );


    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================================
   CLEAR CHAT
========================================= */

clearChat.addEventListener(
    "click",
    () => {

        chat.innerHTML = "";

        addChatMessage(
            "ai",
            "Conversation cleared. Where would you like to travel?"
        );

    }
);


/* =========================================
   VOICE ASSISTANT
========================================= */

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition =
        new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-IN";


    recognition.onstart =
        () => {

            isListening = true;

            micButton.classList.add(
                "listening"
            );

            voiceStatusText.textContent =
                "Listening... Speak now";

        };


    recognition.onresult =
        event => {

            const transcript =
                event.results[0][0]
                    .transcript;

            messageInput.value =
                transcript;

            addChatMessage(
                "user",
                transcript
            );


            setTimeout(() => {

                const response =
                    generateAIResponse(
                        transcript
                    );

                addChatMessage(
                    "ai",
                    response
                );

            }, 600);

        };


    recognition.onerror =
        event => {

            console.log(
                "Speech recognition error:",
                event.error
            );

            if (
                event.error ===
                "not-allowed"
            ) {

                showToast(
                    "Microphone permission was denied.",
                    false
                );

            } else {

                showToast(
                    "Voice recognition could not start.",
                    false
                );

            }

        };


    recognition.onend =
        () => {

            isListening = false;

            micButton.classList.remove(
                "listening"
            );

            voiceStatusText.textContent =
                "Tap the orb to speak";

        };

} else {

    voiceStatusText.textContent =
        "Voice recognition is not supported";

}


/* =========================================
   MICROPHONE BUTTON
========================================= */

micButton.addEventListener(
    "click",
    () => {

        if (!recognition) {

            showToast(
                "Your browser does not support voice recognition.",
                false
            );

            return;

        }


        if (isListening) {

            recognition.stop();

            return;

        }


        try {

            recognition.start();

        } catch (error) {

            console.log(error);

        }

    }
);


/* =========================================
   QUICK COMMANDS
========================================= */

commands.forEach(
    command => {

        command.addEventListener(
            "click",
            () => {

                const text =
                    command.dataset.command;

                messageInput.value =
                    text;

                addChatMessage(
                    "user",
                    text
                );


                setTimeout(() => {

                    const response =
                        generateAIResponse(
                            text
                        );

                    addChatMessage(
                        "ai",
                        response
                    );

                }, 600);

            }
        );

    }
);


/* =========================================
   RECENT SEARCHES
========================================= */

clearRecent.addEventListener(
    "click",
    () => {

        recentList.innerHTML =
            `
            <div class="empty-recent">
                No recent searches.
            </div>
            `;

        showToast(
            "Recent searches cleared.",
            true
        );

    }
);


/* =========================================
   PROFILE MENU
========================================= */

profileButton.addEventListener(
    "click",
    event => {

        event.stopPropagation();

        profileMenu.classList.toggle(
            "show"
        );

    }
);


document.addEventListener(
    "click",
    event => {

        if (
            !profileMenu.contains(event.target) &&
            !profileButton.contains(event.target)
        ) {

            profileMenu.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   LOGOUT
========================================= */

logoutButton.addEventListener(
    "click",
    () => {

        showToast(
            "Logging out...",
            true
        );


        setTimeout(() => {

            /*
             * Later we will replace this
             * with your actual login page.
             */

            window.location.href = "../login/index.html";

        }, 900);

    }
);


/* =========================================
   RECENT SEARCH CLICK
========================================= */

document
    .querySelectorAll(".recent-item")
    .forEach(item => {

        item.addEventListener(
            "click",
            () => {

                const title =
                    item.querySelector(
                        "strong"
                    ).textContent;


                const parts =
                    title.split("→");


                if (parts.length === 2) {

                    fromLocation.value =
                        parts[0].trim();

                    toLocation.value =
                        parts[1].trim();

                }


                showToast(
                    "Journey loaded.",
                    true
                );

            }
        );

    });


/* =========================================
   TOAST
========================================= */

function showToast(
    message,
    success = true
) {

    clearTimeout(
        toastTimer
    );


    toastMessage.textContent =
        message;


    toastIcon.textContent =
        success ? "✓" : "!";


    toastIcon.style.background =
        success
            ? "#22c55e"
            : "#ef4444";


    toast.classList.add(
        "show"
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            3000
        );

}


/* =========================================
   HELPERS
========================================= */

function capitalize(text) {

    return text
        .charAt(0)
        .toUpperCase() +
        text.slice(1);

}


function formatDate(dateString) {

    const date =
        new Date(
            dateString + "T00:00:00"
        );

    return date.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}