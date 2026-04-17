const express = require("express")
const User = require("../models/user")
const profileRouter = express.Router();

const { UserAuth} = require("../middlewares/auth")

profileRouter.get("/profile", UserAuth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});


module.exports =profileRouter

