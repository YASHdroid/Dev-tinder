const mongoose = require("mongoose");

const connectDB = async () => {
  try {

    console.log("ENV:", process.env.DB_CONNECTION_SECRET);

    await mongoose.connect(
      process.env.DB_CONNECTION_SECRET,
      {
        serverSelectionTimeoutMS: 30000,
        family: 4,
      }
    );

    console.log("✅ Mongo Connected");

  } catch (err) {

    console.log("FULL ERROR");
    console.log(err);

  }
};

module.exports = connectDB;