const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    icon: {
        type: String,
        default: "🚆"
    },
    name: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    transport: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    departure: {
        type: String,
        required: true
    },
    arrival: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seats: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);