const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const colors = require("colors");

const registerUser = async (req, res) => {
    res.send("Register a user");
};

const logInUser = async (req, res) => {
    res.send("Login a user");
};

const getProfile = async (req, res) => {
    res.send("Get user profile");
};

module.exports = { registerUser, logInUser, getProfile };
