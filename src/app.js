const express = require("express");

const app= express()

app.use((req,res)=>{

    res.send("Heo fr")
})


app.listen(3000,()=>{
    console.log("if listening on port");
    
});
