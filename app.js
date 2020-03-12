const express = require("express"); // import express
const exphbs  = require("express-handlebars") // import handlebarsjs the template frame work
const bodyParser = require('body-parser')
const mongoose = require('mongoose');//import mongoose
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const app = express(); // initialise app

// Map global promise
mongoose.Promise = global.Promise;
// Connect to mongoose
mongoose.connect('mongodb://localhost/rancourAnimusDev', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log("error ", err))

// Load Idea Model
require('./models/Idea');
const Idea = mongoose.model('ideas')

// add middlewares below this
// Handlebars Middleware
app.engine('handlebars', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

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

// Idea Index Page
app.get("/ideas",(req, res)=>{
    Idea.find({})
    .sort({date:'desc'})
    .then(ideas => {
        res.render('ideas/index',{
           ideas:ideas 
        });
    });
})

// Add Idea Form
app.get("/ideas/add",(req, res)=>{
    res.render('ideas/add');
})
// Edit Idea Form
app.get("/ideas/edit/:id",(req, res)=>{
    Idea.findOne({
        _id: req.params.id
    })
    .then(idea => {
        res.render('ideas/edit',{
            idea:idea
        });
    })
})

// Process Form
app.post('/ideas', (req,res) => {
    console.log(req.body)
    let errors=[];
    if(!req.body.title){
        errors.push({text:'Please add a title'})
    }
    if(!req.body.details){
        errors.push({text:'Please add some details'})
    }
    if(errors.length>0){
        res.render('ideas/add',{
            errors: errors,
            title: req.body.title,
            details: req.body.details
        })
    }
    else{
        const newUser={
            title: req.body.title,
            details: req.body.details
        }
        new Idea(newUser)
            .save()
            .then(idea => {
                res.redirect('/ideas');
            })
    }
});

const port = 5000;

app.listen(port , ()=>{
    //callback function
    console.log(`Server started on port ${port}`);
});