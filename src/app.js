const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// Middleware to parse JSON
app.use(express.json());

app.post("/signup", async (req, res) => {

 
  try {
    const user = new User(req.body)
      await user.save();

    res.send("user added");
  } catch (err) {
    res.status(500).send("Error: " + err.message);
  }
});

const { adminAuth, UserAuth } = require("./middlewares/auth");

app.use("/test", (req, res) => res.send("Hello fr test"));

app.get("/user", UserAuth, (req, res) => {
  res.send({ firstname: "Yash", lastname: "Chopra" });
});

app.post("/user", (req, res) => res.send("hello to the server"));

app.use("/admin", adminAuth);
app.get("/admin/getAllData", (req, res) => res.send("all data sent"));
app.get("/admin/deleteUser", (req, res) => res.send("all data delete")); // fixed syntax

// Connect DB, then start server
connectDB()
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });