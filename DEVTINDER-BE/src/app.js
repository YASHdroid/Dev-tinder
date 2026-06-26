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
  origin: ["https://dev-tinder-three-beta.vercel.app", "http://localhost:5173"],
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
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log("Listening on port " + PORT));
  })
  .catch((err) => {
    console.log(err);
  });
