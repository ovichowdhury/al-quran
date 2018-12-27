var mongoose = require('mongoose');
var dbConf = require('../config/mongo');

mongoose.connect(dbConf.dbUrl, { useNewUrlParser: true })
    .then((val) => console.log("Connected to db : "))
    .catch((val) => console.log("Failed to Connect to db : ", val));


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
        maxlength : 200
    },
    email : {
        type : String,
        required : true,
        trim : true,
        lowercase : true,
        unique : true,
        validate : [validateEmail, "Valid email is required"]
    },
    userType : {
        type : String,
        trim : true,
        enum : ["admin", "guest"],
        default : "guest"
    },
    regDate : {
        type : Date,
        default : Date.now
    }
});




const userModel = mongoose.model('users', userSchema);

module.exports = userModel;