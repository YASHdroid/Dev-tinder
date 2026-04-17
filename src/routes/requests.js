const express = require("express");
const requestRouter = express.Router();
const { UserAuth } = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest", UserAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent the connection request");
});

module.exports = requestRouter;