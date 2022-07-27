const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
    registerUser,
    loginUser,
    getProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);

// Privatizing the getProfile method by verifying the token through the middleware.
router.get("/profile", [auth], getProfile);

module.exports = router;
