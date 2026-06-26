require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authrouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/userReq");

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
const uploadRouter = require("./routes/upload");
app.use("/", uploadRouter);


app.use("/", authrouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// FIX: removed unprotected /user GET, DELETE, PATCH routes — security risk
// FIX: removed dead /test and POST /user routes

connectDB()
  .then(() => {
    app.listen(3000, () => console.log("Listening on port 3000"));
  })
  .catch((err) => {
    console.log(err);
  });