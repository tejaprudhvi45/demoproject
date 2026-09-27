const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                message: "Password is required"
            });
        }

        if (!/^\d{6}$/.test(password)) {
            return res.status(400).json({
                message: "Password must be exactly 6 digits"
            });
        }

        const userId = "TA" + Math.floor(100000 + Math.random() * 900000);

        const existingUser = await User.findOne({ userId });

        if (existingUser) {
            return res.status(500).json({
                message: "Please try again"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            userId,
            password: hashedPassword
        });

        await user.save();

        res.status(201).json({
            message: "Registration successful",
            userId: user.userId
        });

    } catch (error) {
        console.log("Registration error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { userId, password } = req.body;

        if (!userId || !password) {
            return res.status(400).json({
                message: "User ID and password are required"
            });
        }

        if (!/^\d{6}$/.test(password)) {
            return res.status(400).json({
                message: "Password must be exactly 6 digits"
            });
        }

        const user = await User.findOne({ userId });

        if (!user) {
            return res.status(401).json({
                message: "Invalid User ID or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid User ID or password"
            });
        }

        const token = jwt.sign(
            {
                userId: user.userId
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                userId: user.userId
            }
        });

    } catch (error) {
        console.log("Login error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;
