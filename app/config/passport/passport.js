var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, user) {
	var User = user;
	var LocalStrategy = require('passport-local').Strategy;

	//Passport strategy used when we create a new user
	passport.use('local-signup', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		}, function(req, email, password, done) {

			var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};
			//	Looks for a user in the database with the given email.
			User.findOne({
				where: {
					email: email
				}
			}).then(function(user) {
				if (user){
					return done(null, false, {
						message: 'That email is already taken'
					});
				} else {
					//	If there is no user, generates the hash based on input password, packages as JSON and creates a new element in the database
					var userPassword = generateHash(password);
					var data = {
						name: req.body.name,
						email: email,
						password: userPassword
					};
					User.create(data).then(function(newUser, created) {
						if (!newUser) {
							return done(null, false)
						}
						if (newUser) {
							//On success, creates a session.
							return done(null, newUser)
						}
					});
				} 
			});
		}
	));
 	//	Passport used for login in with an already existing account
 	passport.use('local-signin', new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		}, function(req, email, password, done) {
			var generateHash = function(password) {
				return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
			};

			User.findOne({
				where: {
					email: email,
				}
			}).then(function(user) {
				if (user && bCrypt.compareSync(password, user.password)){
					//If the user exists and the password is correct, creates a session for that user.
					return done(null, user);
				} else {
					return done(null, false);
				}
			})
		}
 	));

	//	Serializes user
	passport.serializeUser(function(user, done) {
  	done(null, user);
	});
	
	//	Deserializes user
	passport.deserializeUser(function(user, done) {
  	done(null, user);
	});
}