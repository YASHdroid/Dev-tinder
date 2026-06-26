const jwt = require("jsonwebtoken");
const User = require("../models/user");

const UserAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).send("Please Login");
    }

    // FIX: use JWT_SECRET from .env instead of hardcoded string
    const decodedOBJ = jwt.verify(token, process.env.JWT_SECRET);

    const { _id } = decodedOBJ;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;
    next();

  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = { UserAuth };