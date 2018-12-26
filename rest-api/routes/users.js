var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  userModel.find({}, function(err, result) {
    if(err) {
      res.status(500).json({message : err});
    }
    else{
      res.status(200).json(result);
    }
  });
  
});

/* Create user */
router.post('/create', async function(req, res) {
  try{
    let userInfo = req.body;
    let salt = await bcrypt.genSalt(10);
    let hashPass = await bcrypt.hash(userInfo.password, salt);
    let newUser = new userModel({
      username : userInfo.username,
      password : hashPass,
      email : userInfo.email
    });
    let result = await newUser.save();
    res.status(200).json({
      username : result.username,
      email : result.email,
      regDate : result.regDate
    });
  }
  catch(ex){
    res.status(500).json({message : ex});
  }

});


/** updating a user */
router.put('/update/:username', async function(req, res) {
  try{
    let salt = await bcrypt.genSalt(10);
    let hashPass = await bcrypt.hash(req.body.password,salt);
    let result = await userModel.findOneAndUpdate(
      {username : req.params.username},
      {username : req.body.username, password : hashPass, email : req.body.email}
    );
    res.status(200).json(result);
  }
  catch(ex){
    res.status(500).json({message : ex});
  }
    
});

/** delete user */
router.delete('/delete/:username', function(req, res) {
  userModel.findOneAndRemove({username : req.params.username}, function(err, result) {
    if(err) {
      res.status(500).json({message : err});
    }
    else{
      res.status(200).json(result);
    }
  });
});


module.exports = router;
