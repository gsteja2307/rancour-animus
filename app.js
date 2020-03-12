const express = require("express"); // import express
const exphbs  = require("express-handlebars") // import handlebarsjs the template frame work
const mongoose = require('mongoose');//import mongoose

const app = express(); // initialise app

// Map global promise
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/rancourAnimusDev', {
    
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log("error ", err))

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas')

// add middlewares below this
// Handlebars Middleware
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');


// Index Route
app.get('/',(req, res)=>{
    const title = "Welcome to Rancour-Animus";
    res.render("index",{
        title: title
    });
});

// About Route
app.get("/about",(req, res)=>{
    res.render('about');
})

// Add Idea Form
app.get("/ideas/add",(req, res)=>{
    res.render('ideas/add');
})

const port = 5000;

app.listen(port , ()=>{
    //callback function
    console.log(`Server started on port ${port}`);
});