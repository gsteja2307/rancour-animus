const express = require("express"); // import express

const app = express(); // initialise app

// Index Route
app.get('/',(req, res)=>{
    res.send("INDEX")
});

// About Route
app.get("/about",(req, res)=>{
    res.send('ABOUT');
})

const port = 5000;

app.listen(port , ()=>{
    //callback function
    console.log(`Server started on port ${port}`);
});// listen to the port specified above