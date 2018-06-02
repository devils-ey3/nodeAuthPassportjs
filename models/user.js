const   mongoose = require('mongoose'),
        passportLocalMongoose = require('passport-local-mongoose');

const user_Schema = new mongoose.Schema({
    username : {
        type:String,
    },
    password: {
        type:String
    },
    email:{
        type:String
    }
});
user_Schema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',user_Schema);

