const express = require("express");
const { validateSignUPData } = require("../utils/validation");
const authrouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

authrouter.post("/signup", async (req, res) => {
  try {
    validateSignUPData(req.body);

    const { firstName, lastName, age, emailId, password, gender, about, photoUrl } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      age,
      emailId,
      password: passwordHash,
      gender,
      about,
      photoUrl,
    });

    await user.save();

    res.send("user added");

  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

authrouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // FIX: use JWT_SECRET from .env instead of hardcoded string
    const token = jwt.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.send(user);

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authrouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send();
});

module.exports = authrouter;