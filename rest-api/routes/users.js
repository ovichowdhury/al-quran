var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');
var auth = require('../middlewares/auth');
var userValidator = require('../middlewares/userValidator');
var keyPath = path.join(__dirname, '../', '/config/key.json');

/* GET users listing. */
router.get('/', auth.authenticate, async function (req, res, next) {
	userModel.find({}, function (err, result) {
		if (err) {
			res.status(500).json({ message: err });
		}
		else {
			res.status(200).json(result);
		}
	});

});

/* Create user */
router.post('/create', [auth.authenticate, userValidator.create], async function (req, res) {
	try {
		let userInfo = req.body;
		let salt = await bcrypt.genSalt(10);
		let hashPass = await bcrypt.hash(userInfo.password, salt);
		let newUser = new userModel({
			username: userInfo.username,
			password: hashPass,
			email: userInfo.email,
			userType: userInfo.userType
		});
		let result = await newUser.save();
		res.status(200).json({
			username: result.username,
			email: result.email,
			userType: result.userType,
			regDate: result.regDate
		});
	}
	catch (ex) {
		res.status(500).json({ message: ex });
	}

});


/** updating a user */
router.put('/update/:username', [auth.authenticate, userValidator.update], async function (req, res) {
	try {
		let salt = await bcrypt.genSalt(10);
		let hashPass = await bcrypt.hash(req.body.password, salt);
		let result = await userModel.findOneAndUpdate(
			{ username: req.params.username },
			{ username: req.body.username, password: hashPass, email: req.body.email, userType: req.body.userType }
		);
		res.status(200).json(result);
	}
	catch (ex) {
		res.status(500).json({ message: ex });
	}

});

/** delete user */
router.delete('/delete/:username', [auth.authenticate, userValidator.delete], function (req, res) {
	userModel.findOneAndRemove({ username: req.params.username }, function (err, result) {
		if (err) {
			res.status(500).json({ message: err });
		}
		else {
			res.status(200).json(result);
		}
	});
});


router.post('/login', [userValidator.login], async function (req, res) {
	try {

		let userData = await userModel.findOne({ username: req.body.username });
		if (!userData) return res.status(401).json({ message: "Invalid credentials" });
		let isPassValid = await bcrypt.compare(req.body.password, userData.password);
		if (!isPassValid) return res.status(401).json({ message: "Invalid credentials" });
		fs.readFile(keyPath, (err, data) => {
			let keyFileData = JSON.parse(data);
			let jwtToken = jwt.sign(
				{ _id: userData._id, username: userData.username, userType: userData.userType },
				keyFileData.jwtPrivateKey
			);
			res.header('x-auth-token', jwtToken).status(200).json({ message: "Authenticated" });
		});

	}
	catch (ex) {
		res.status(500).json({ message: ex });
	}
});


module.exports = router;
