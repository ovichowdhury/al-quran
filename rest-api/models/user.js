const mongoose = require('../db-conf/mongo');


var validateEmail = function(email) {
    let regularExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regularExp.test(email);
}

const userSchema = mongoose.Schema({
    username : {
        type : String,
        unique : true,
        required : true,
        trim: true,
        lowercase: true,
        minlength : 8,
        maxlength: 20
    },
    password : {
        type : String,
        required : true,
        minlength : 8,
        maxlength : 50
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate : [validateEmail, "Valid email is required"]
    },
    regDate : {
        type : Date,
        default : Date.now
    }
});




const userModel = mongoose.model('users', userSchema);

module.exports = userModel;