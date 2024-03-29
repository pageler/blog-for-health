const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");

// @route   POST api/users/register
// @desc    Register a user
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        let toasts = [];
        if (!firstName)
            toasts.push({ message: "Please enter first name", type: "error" });
        if (!lastName)
            toasts.push({ message: "Please enter last name", type: "error" });

        if (!password)
            toasts.push({ message: "Please enter password", type: "error" });
        if (password && (password.length < 8 || password.length > 12))
            toasts.push({
                message: "Please enter password between 8 and 12 characters",
                type: "error",
            });

        if (!email || !validatedEmail(email))
            toasts.push({
                message: "Please enter a valid Email",
                type: "error",
            });
        if (toasts.length > 0) return res.status(400).json({ toasts });

        let newUser = await User.findOne({ email });

        if (newUser)
            return res
                .status(400)
                .json([{ message: "User already exists", type: "error" }]);

        newUser = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();

        const payload = {
            user: { id: newUser._id },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 28800 },
            (err, token) => {
                if (err) throw err;
                res.json(token);
            }
        );
    } catch (error) {
        console.error(`ERROR: ${error.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

// @route   POST api/users/login
// @desc    Login a user
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        let toasts = [];
        if (!password)
            toasts.push({
                message: "A valid Password is required",
                type: "error",
            });
        if (password && (password.length < 8 || password.length > 12))
            toasts.push({
                message: "Password must be at least 6 - 12 characters long",
                type: "error",
            });

        if (!email || !validatedEmail(email))
            toasts.push({
                message: "A valid Email is required",
                type: "error",
            });

        if (toasts.length > 0) return res.status(400).json(toasts);

        let user = await User.findOne({ email });

        if (!user)
            return res
                .status(400)
                .json([{ message: "User does not exist", type: "error" }]);

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)
            return res
                .status(400)
                .json([{ message: "Invalid credentials", type: "error" }]);

        const payload = {
            user: {
                id: user._id,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: 28800,
            },
            (err, token) => {
                if (err) throw err;
                res.json(token);
            }
        );
    } catch (err) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

// @route   GET api/users/profile
// @desc    Get user profile
// @access  Private
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("-password")
            .select("-__v")
            .select("-createdAt")
            .select("-updatedAt");

        if (!user)
            return res
                .status(404)
                .json([{ message: "User does not exist", type: "error" }]);

        res.json(user);
    } catch (error) {
        console.error(`ERROR: ${err.message}`.bgRed.underline.bold);
        res.status(500).send("Server Error");
    }
};

function validatedEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

module.exports = { registerUser, loginUser, getProfile };
