const express = require("express")
const User = require("../models/user")
const profileRouter = express.Router();
// const ValidateEditProfileData = require("../utils/validation")
const { ValidateEditProfileData } = require("../utils/validation");
const { UserAuth } = require("../middlewares/auth")

profileRouter.get("/profile/view", UserAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err)  {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", UserAuth, async (req, res) => {

  try {

    if (!ValidateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }

    const loggedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      loggedInUser[key] = req.body[key];
    });

    await loggedInUser.save();

    res.json({
      message: "Profile updated successfully",
      data: loggedInUser,
    });

  } catch (err) {

    res.status(400).json({
      message: err.message,
    });

  }

});

module.exports = profileRouter