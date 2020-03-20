const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


// User Login ROute
router.get('/login', (req, res) => {
    res.render('users/login')
});
// User Register ROute
router.get('/register', (req, res) => {
    res.render('users/register')
});


module.exports = router;