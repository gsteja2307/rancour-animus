const express = require("express"); // import express

const app = express(); // initialise app

const port = 5000;

app.listen(port , ()=>{
    //callback function
    console.log(`Server started on port ${port}`);
});// listen to the port specified above