const   express        = require("express"),
        app            = express(),
        bodyParser     = require("body-parser"),
        mongoose       = require("mongoose"),
        passport       = require("passport"),
        LocalStrategy  = require("passport-local");

const Users = require('./routes/userCredential');
mongoose.connect('mongodb://localhost/nodeAuth')

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine','ejs');


app.use(require('express-session')({
    secret:"This is key",
    resave:true,
    saveUninitialized:false
}))

app.use(passport.initialize());
app.use(passport.session());


app.use('/',Users);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});