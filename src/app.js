const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const { UserAuth } = require("./middlewares/auth"); 

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());

const authrouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/requests")

app.use("/" ,authrouter)
app.use("/" ,profileRouter)
app.use("/" ,requestRouter)


app.get("/user" , async(req ,res)=>{
  const usermail = req.query.emailId; 

  try{
    const user = await User.find({ emailId : usermail }) // ✅ fixed

    res.send(user); 
  }

  catch (err) {
    res.status(400).send("something wnet wrong")
  }
})

app.delete("/user", async (req, res) => {

  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Error deleting user");
  }
});

// update a user
app.patch("/user", async (req, res) => {
  const userid = req.body.userId;

  const data = req.body;
  try {

    const ALLOWED_UPDATES= ["gender","password","about"]
    const isUpdateAllowed =Object.keys(data).every((k)=>
    ALLOWED_UPDATES.includes(k)
    );

    if(!isUpdateAllowed){
      throw new Error("update not allowed")
    }
    const user = await User.findByIdAndUpdate(userid, data);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated");

  } catch (err) {
    res.status(400).send("Error updating user");
  }
});



app.use("/test", (req, res) => res.send("Hello fr test"));

app.post("/user", (req, res) => res.send("hello to the server"));



// Connect DB, then start server
connectDB()
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });