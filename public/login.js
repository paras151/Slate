const stripe = Stripe('sk_test_MgFRWqSGP7RlXOY2Tn7fs1V900KzGb6WvH');


const updateForm = document.querySelector('.update-profile');
const form = document.querySelector('.login-Page');
const signup = document.querySelector('.signup-Page');
console.log(signup)
const pass = document.getElementById('pass');
console.log(pass)

// import { assertExpressionStatement } from "babel-types";

// import { assertExpressionStatement } from "babel-types";
// console.log(form)

if (form) {
	form.addEventListener('submit', e => {
		e.preventDefault();
		email = document.getElementById('email').value;
		password = document.getElementById('pw').value;
		login(email, password);
	});
}
var email, password;

const login = async (email, password) => {
	try {

		const res = await axios.post('http://localhost:3000/api/users/login', {
			email: email,
			password: password,
		});
		// console.log(res.data);

		window.setTimeout(() => {
			location.assign('/home');
		}, 1000);
	} catch (err) {
		console.log(err);
	}
};

// console.log(updateForm);
var name, username, phone, email;

if(updateForm){
updateForm.addEventListener('submit', e => {
	e.preventDefault();
	
	name = document.getElementById('name').value;
	username = document.getElementById('username').value;
    phone = document.getElementById('phone').value;
    email = document.getElementById('email').value;
	update(name, username, phone, email);
});
}
var update = async function(name, username, phone, email) {
	try {
		console.log(name + ' ' + username);
		const res = await axios.patch('http://localhost:3000/api/users/update', {
			name: name,
            username: username,
            phone: phone,
            email: email
		});

		location.reload(true);
	} catch (err) {
        console.log(err)
    }
};

const logout = document.getElementById('logout');
var log = async function() {
	try {
		const res = await axios.get('http://localhost:3000/api/users/logout');
		// console.log(res.data);

		location.reload(true);
	} catch (err) {
		console.log(err);
	}
};
if (logout) logout.addEventListener('click', log);


if(pass) pass.addEventListener('submit',(e)=>{
	e.preventDefault();
	var currPass = document.getElementById('currPass').value
	var newPass = document.getElementById('newPass').value
	var conPass = document.getElementById('conPass').value
	updatePass(currPass,newPass,conPass);

});
var updatePass = async function(currPass,newPass,conPass){
	try{
		const res = await axios.patch('http://localhost:3000/api/users/updatePassword',{
		currPass :currPass,
		newPass :newPass,
		conPass : conPass
	})
		if(res.data.status === "Password Updated"){
		location.assign("http://localhost:3000/me");
		}
		else{
			location.assign("http://localhost:3000/home");

		}
	}
	catch(err){

	}
}

if(signup) signup.addEventListener('click',(e)=>{
	e.preventDefault();

	email = document.getElementById('emails').value;
	password = document.getElementById('pws').value;
	confirmPassword = document.getElementById('cp').value;
	signupfun(email, password,confirmPassword);
})

signupfun = async function(email, password,confirmPassword){
	var res = await axios.post("http://localhost:3000/api/users/signup",{
		email:email,
		password:password
	})
}


stripe.redirectToCheckout({
	// Make the id field from the Checkout Session creation API response
	// available to this file, so you can provide it as parameter here
	// instead of the {{CHECKOUT_SESSION_ID}} placeholder.
	sessionId: res.data.session.id
  }).then(function (result) {
	// If `redirectToCheckout` fails due to a browser or network
	// error, display the localized error message to your customer
	// using `result.error.message`.
  });


