const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const keyPath = path.join(__dirname, '../', '/config/key.json');
const userModel = require('../models/user');


async function isTokenUserExists(username) {
    try{
        let result = await userModel.findOne({username: username});
        if(result == null)
            return false; 
        else
            return true;
    }
    catch(ex){
        console.log(ex);
        throw ex;
    }
}

var authenticate = async function(req, res, next) {
    try{

        const token = req.headers["x-auth-token"];
        if(!token) return res.status(401).json({message : "No token provided"});

        fs.readFile(keyPath, async (err, data) => {
            try{
                if(err) throw err;
                let keyFileData = JSON.parse(data);
                let decodedResult = jwt.verify(token, keyFileData.jwtPrivateKey);
                console.log(decodedResult);
                let isTokExists = await isTokenUserExists(decodedResult.username);
                //console.log("tok exists: ", isTokExists);
                if(isTokExists == true){
                    req.user = decodedResult;
                    next();
                }
                else{
                    return res.status(500).json({message: "Token user deleted"});
                }
            }
            catch(ex){
                return res.status(400).json({message : "Invalid token"});
            }
        });
    }
    catch(ex) {
        return res.status(400).json({message : "Bad Request"});
    }
}

module.exports = {
    authenticate : authenticate
}