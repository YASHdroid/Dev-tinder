const express = require("express")
const { validateSignUPData } = require("../utils/validation");
const authrouter = express.Router();
const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
authrouter.post("/signup", async (req, res) => {
  try {

    validateSignUPData(req.body); 

    const { firstName, lastName, emailId, password, gender, about } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      gender,
      about,
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

    const isPasswordValid = await user.validatePassword(password)

    if (isPasswordValid) {

      // create a JWT TOKEN
      const token = jwt.sign(
  { _id: user._id },
  "Yash00@#",
  { expiresIn: "7d" }
);

      // add token to cookie and send response to user
      res.cookie("token", token, { httpOnly: true });

      res.send("Login successful");

    }
    else{
       throw new Error("Invalid credentials");
    }

  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports =authrouter;