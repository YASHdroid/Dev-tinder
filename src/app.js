const express = require("express");

const app = express();

const { adminAuth,UserAuth } =require("./middlewares/auth")

// app.use("/", (req, res) => {
//     res.send("Hello fr");
// });

app.use("/test", (req, res) => {
    res.send("Hello fr test");
});

app.get("/user",UserAuth, (req, res) => {
    res.send({ firstname: "Yash", lastname: "Chopra" });
}); // this will only handle get calls to /user

app.post("/user", (req, res) => {
    res.send("hello to the server");
});

app.use("/admin" ,adminAuth)


app.get("/admin/getAllData", (req, res) => {



   
        res.send("all data sent");
    

    
});

app.get("/admin/DeleteUser", (req, res) => {
    res.send("all data delete");
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});