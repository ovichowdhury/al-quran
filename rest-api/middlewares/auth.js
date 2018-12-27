const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const keyPath = path.join(__dirname, '../', '/config/key.json');

var authenticate = async function(req, res, next) {
    try{

        const token = req.headers["x-auth-token"];
        if(!token) return res.status(401).json({message : "No token provided"});

        fs.readFile(keyPath, (err, data) => {
            try{
                if(err) throw err;
                let keyFileData = JSON.parse(data);
                let decodedResult = jwt.verify(token, keyFileData.jwtPrivateKey);
                console.log(decodedResult);
                req.user = decodedResult;
                next();
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