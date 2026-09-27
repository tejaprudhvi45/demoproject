const express = require("express");
const Ticket = require("../models/Ticket");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch tickets"
        });
    }
});

module.exports = router;