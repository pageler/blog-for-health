const express = require("express");
const router = express.Router();

const {
    registerUser,
    logInUser,
    getProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", logInUser);

router.get("/profile", getProfile);

module.exports = router;
