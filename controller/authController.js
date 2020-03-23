const userModel = require('../model/userModel');
const planModel = require('../model/planModel');
var jwt = require('jsonwebtoken');
const jsonwebtoken = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
const { main } = require('../utility/email');
const { ObjectID } = require('mongodb');
var user = require('../model/userModel');
const Email = require('../utility/email');

var userLogin = async (req, res) => {
	try {
		// console.log(req.body);

		if (req.body.email == undefined || req.body.password == undefined) {
			res.status(401).send('ENTER PROPERLY !!!');
		}
		var result = await user.findOne({ email: req.body.email });

		const email = req.body.email;

		if (!result) {
			res.status(401).json({
				email,
			});
		}

		const token = jsonwebtoken.sign({ result: result._id }, 'Any random string', { expiresIn: '10d' });
		// console.log(token)
		// res.cookies.jwt = token;

		let pass = result.password;
		// console.log(pass)
		var proof = await bcrypt.compare(req.body.password, pass);
		// console.log(proof)
		if (!proof) {
			return res.end('Password is wrong');
		}
		
		res.cookie('jwt', token, { httpOnly: 'true' });

		let url = 'http://localhost:3000/me';
		// await new Email(result, url).sendWelcome();

		res.status(201).json({
			status: 'success',
			token,
			result,
		});
	} catch (err) {
		res.end('wrong email');
		// console.log(err);
	}
};

var userLogout = async (req, res) => {
	const token = jwt.sign({ foo: 'bar' }, 'kdak');
	res.cookie('jwt', token, {
		expires: new Date(Date.now() * 20),
		httpOnly: 'true',
	});
	res.status(201).json({
		status: 'user logged out',
	});
};
var userSignup = async (req, res) => {
	var data = req.body;
	let { email, password } = data;

	if (!email || !password) {
		res.end('email or password not present');
	}

	let result = await userModel.create(data);

	let url = 'http://localhost:3000/me';
	await new Email(result, url).sendWelcome();

	const token = jsonwebtoken.sign({ result: result._id }, 'Any random string', { expiresIn: '10d' });

	res.cookie('jwt', token, { httpOnly: 'true' });
	res.status(201).end("signedup");
};

var protectRoute = async (req, res, next) => {
	var token;
	console.log("haha")
	try {
		if (req.cookies.jwt) {
			token = req.cookies.jwt;
		} else {
			res.render("login.ejs")
			
		}
		// console.log(token);
		try {
			var tokenMatch = jsonwebtoken.verify(token, 'Any random string');
		} catch (err) {
			if (!tokenMatch) {
				console.log("wrong email or password")

				var userPlans = await planModel.find();

				userPlans = userPlans.slice(0, 3);
				res.render('login.ejs', {
					userPlans: userPlans,
					title: req.url.slice(1),
				});
			}
		}
	} catch (err) {
		console.log(err);
	}

	// console.log(tokenMatch.result)
	if(tokenMatch){
	var id = new ObjectID(tokenMatch.result);
	// console.log(id, typeof id)
	var user = await userModel.findById(tokenMatch.result);
	if (user) {
		res.locals.userObj = user;
		req.headers.user = user;
		// console.log(user)
	} else res.end('user does not exist');
}

	next();
};

var isLoggedIn = async (req, res, next) => {
	var token;
	try {
		if (req.cookies.jwt) {
			token = req.cookies.jwt;

			// console.log(token);
			var tokenMatch = jsonwebtoken.verify(token, 'Any random string');
			// console.log(tokenMatch);

			if (!tokenMatch) {
				res.send('user not authenticated');
				return next();
			}
		}
		var id = new ObjectID(tokenMatch.result);
		// console.log(id)
		var user = await userModel.findById(tokenMatch.result);
		// console.log(user)
		if (!user) {
			res.end('user does not exist');
			return next();
		} else {
			res.locals.userObj = user;
		}
		next();
	} catch (err) {
		next();
	}
};

var authorize = (...args) => {
	//can pass as many arguments,used in order to add
	var roles = args; //more profiles who can access specific routes

	return function(req, res, next) {
		//console.log(req.headers.role);
		if (roles.includes(req.headers.role)) {
			next();
		} else {
			res.send('user not authorized');
		}
	};
};

const forgotPassword = async (req, res) => {
	var email = req.body.email;
	// //console.log(email)
	var findUser = await userModel.findOne({ email: email });
	// //console.log(findUser)
	if (!findUser) {
		res.end('user does not exist');
	}
	let token = findUser.createResetToken();
	console.log(token);

	await findUser.save({ validateBeforeSave: false });

	let message = 'token to reset your password has been sent to your email-id' + token;
	try {
		main({
			from: 'ce614200a3-965b43@inbox.mailtrap.io',
			message: message,
			to: findUser.email,
		});
	} catch (err) {}
	res.end('token to reset your password has been sent your emal');
};

var resetPassword = async (req, res) => {
	const token = req.params.token;

	const encryptedToken = crypto
		.createHash('sha256')
		.update(token)
		.digest('hex');

	let user = await userModel.findOne({ resetToken: encryptedToken });

	if (!user) {
		res.end('Unauthorized access');
	}

	user.password = req.body.password;
	user.confirmPassword = req.body.confirmPassword;

	user.resetToken = undefined;
	user.expiresIn = undefined;
	user.save();

	res.end('password has been reset');
};

var updatePass = async (req, res) => {
	var user = req.headers.user;
	const dbpass = req.headers.user.password;

	var proof = await bcrypt.compare(req.body.currPass, dbpass);

	if (!proof) {
		res.send('wrong password');
		return;
	}

	user.password = req.body.newPass;
	user.confirmPassword = req.body.conPass;

	user.save();

	res.send('Password Updated');
	// const token = jsonwebtoken.sign({ result: result._id }, 'Any random string', { expiresIn: '10d' });
	// res.cookie('jwt', token, { httpOnly: 'true' });
};
module.exports = {
	userLogin,
	userLogout,
	userSignup,
	protectRoute,
	authorize,
	forgotPassword,
	resetPassword,
	isLoggedIn,
	updatePass,
};
