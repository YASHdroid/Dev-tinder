const express = require("express");

const app = express();

// app.use("/", (req, res) => {
//     res.send("Hello fr");
// });

app.use("/test", (req, res) => {
    res.send("Hello fr test");
});



app.get("/user", (req, res) => {
    res.send({ firstname: "Yash", lastname: "Chopra" });
});// this will  oly handle gwt calls to get /user

app.post("/user" ,(req,res)=>{

    res.send("hello to the server")
})


app.listen(3000, () => {
    console.log("Listening on port 3000");
});