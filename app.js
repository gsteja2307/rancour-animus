const express = require("express"); // import express

const app = express(); // initialise app

// How middleware works
app.use(function(req, res, next){
    // console.log(Date.now());
    req.name = "Surya Teja";
    next();
});

// Index Route
app.get('/',(req, res)=>{
    console.log(req.name)
    res.send("INDEX")
});
// sample Route
app.get('/surya',(req, res)=>{
    res.send(req.name)
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