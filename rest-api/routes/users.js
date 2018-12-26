var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

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
router.post('/create', function(req, res) {
  let userInfo = req.body;
  let newUser = new userModel({
    username : userInfo.username,
    password : userInfo.password,
    email : userInfo.email
  });
  newUser.save(function(err, result) {
    if(err){
      res.status(500).json({message : err});
    }
    else{
      res.status(200).json({
        username : result.username,
        email : result.email,
        regDate : result.regDate
      });
    }
  });

});


/** updating a user */
router.put('/update/:username', function(req, res) {
  userModel.findOneAndUpdate(
    {username : req.params.username},
    {username : req.body.username, password : req.body.password, email : req.body.email},
    function(err, result){
      if(err){
        res.status(500).json({message : err});
      }
      else{
        res.status(200).json(result);
      }
    });
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
