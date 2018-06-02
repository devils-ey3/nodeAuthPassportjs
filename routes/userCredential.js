const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const passport = require("passport");
const localStrategy = require('passport-local');
const middlware =  require('../middleware');



passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.get('/',(req,res) => {
    res.render('index');
})
router.get('/registration', (req, res) => {
    res.render('registration');
})

router.get('/secret',middlware.isLoggedIn,(req,res) => {
    console.log(req.user);
    res.render('secret'); 
})

router.post('/registration', (req, res) => {
    User.register(new User({username : req.body.username,email:req.body.email}),req.body.password,function (err, value) {
        if (err){
            console.log(err);
            return res.render('registration');
        }
       
        passport.authenticate("local")(req,res,() => {

            res.redirect('/secret');
        })   
    });
})


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',passport.authenticate("local",{
    successRedirect: '/secret',
    failureRedirect: '/login'
}),(req,res) => {
    console.log('====================================');
    console.log();
    console.log('====================================');
})

router.get('/logout',(req,res) => {
    req.logout(); 
    res.redirect('/');
    
})

module.exports = router;