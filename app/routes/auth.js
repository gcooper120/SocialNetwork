var authController = require('../controllers/authcontroller.js');
module.exports = function(app, passport) {
	
	//Signup
	app.get('/signup', authController.signup);
	app.post('/signup', passport.authenticate('local-signup', {
	        successRedirect: '/dashboard',
	        failureRedirect: '/cat'
	    }
	));


	//Signin
	app.get('/signin', authController.signin);
	app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
	));

	//Get dashboard
	app.get('/dashboard', isLoggedIn, authController.dashboard);
	
	//Logout
	app.get('/logout',authController.logout);
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
			return next();
		res.redirect('/signin');
	}
}