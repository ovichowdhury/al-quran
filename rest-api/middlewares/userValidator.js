const joi = require('joi');


const userJoiSchema = {
    username : joi.string().alphanum().min(8).max(20).required(),
    password : joi.string().min(8).max(50).required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    userType : joi.string().valid('admin', 'guest') 
}

const usernameSchema = {
    username : joi.string().alphanum().min(8).max(20).required() 
} 

const usernamePassSchema = {
    username : joi.string().alphanum().min(8).max(20).required(),
    password : joi.string().min(8).max(50).required()
}

var create = async function(req, res, next) {
    const result = joi.validate({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        userType : req.user.userType
    }, userJoiSchema);
    if(result.error === null)
        next();
    else 
        return res.status(400).json({message : "Invalid Input"});
}

var update = async function(req, res, next) {
    const result = joi.validate({
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        userType : req.user.userType
    }, userJoiSchema);
    const result2 = joi.validate({username : req.params.username}, usernameSchema);
    if(result.error === null && result2.error === null)
        next();
    else 
        return res.status(400).json({message : "Invalid Input"});
}

var del = async function(req, res, next) {
    const result = joi.validate({username : req.params.username}, usernameSchema);
    if(result.error === null)
        next();
    else
        return res.status(400).json({message : "Invalid Input"});
}

var login = async function(req, res, next) {
    const result = joi.validate({
        username : req.body.username,
        password : req.body.password
    }, usernamePassSchema);
    if(result.error === null)
        next();
    else
        return res.status(400).json({message : "Invalid Input"});
}


module.exports = {
    create : create,
    update : update,
    delete : del,
    login : login
}