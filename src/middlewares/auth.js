const jwt = require("jsonwebtoken");
const User = require("../models/user");

const UserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      throw new Error("Token not found");
    }

    const decodedOBJ = jwt.verify(token, "Yash00@#");

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

module.exports = {
  UserAuth,
};