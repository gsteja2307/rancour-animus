const express = require("express"); // import express
const path = require('path');
const exphbs  = require("express-handlebars");// import handlebarsjs the template frame work
const methodOverride = require('method-override');//used for put request from form
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');//import mongoose
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express(); // initialise app

// Load ROutes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

// Map global promise
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/rancourAnimusDev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log("error ", err))


// add middlewares below this
// Handlebars Middleware
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, 'public')))
//method override middleware
app.use(methodOverride('_method'))
// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
// Flash middle ware
app.use(flash());

// Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
});
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

// Use routes
app.use('/ideas', ideas); 
app.use('/users', users);

const port = 5000;

app.listen(port , ()=>{
    //callback function
    console.log(`Server started on port ${port}`);
});