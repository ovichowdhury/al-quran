const joi = require('joi');


const userJoiSchema = {
    username : joi.string().alphanum().min(8).max(20).required(),
    password : joi.string().min(8).max(50).required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    userType : joi.string().valid('admin', 'guest') 
}

var create = function(req, res, next) {
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


module.exports = {
    create : create
}