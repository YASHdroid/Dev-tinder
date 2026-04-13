const mongoose = require("mongoose");

const connectDB = async () => {
  try {
  await mongoose.connect(
  "mongodb://choprayash601_db_user:Yash220306@ac-bszyyjo-shard-00-00.trf50yr.mongodb.net:27017,ac-bszyyjo-shard-00-01.trf50yr.mongodb.net:27017,ac-bszyyjo-shard-00-02.trf50yr.mongodb.net:27017/devtinder?ssl=true&replicaSet=atlas-81o57k-shard-0&authSource=admin&appName=Node"
);

    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database connection not established", err);
    process.exit(1);
  }
};

module.exports = connectDB;