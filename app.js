const express = require("express"); // import express
const exphbs  = require("express-handlebars") // import handlebarsjs the template frame work
const app = express(); // initialise app

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

const port = 5000;

app.listen(port , ()=>{
    //callback function
    console.log(`Server started on port ${port}`);
});