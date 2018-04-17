var express 			= require("express"),
		app 					= express(),
		passport			= require("passport"),
		session				= require("express-session"),
		bodyParser 		= require("body-parser"),
		mysql					= require("mysql2");
		env						= require('dotenv').load(),
		exphbs 				= require('express-handlebars');

//Handlebars config
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//BodyParser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//Passport Configuration
app.use(session({ secret: 'adsvokw0942nv9204231va2',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);

//load Passport strategies
require('./app/config/passport/passport.js')(passport, models.user);
 
//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});



//Listening on port 3000
app.listen(4000, function(err){
	if (!err) {
		console.log("Starting server on port 4000");
		console.log("This is the " + app.get('env') + " environment.");
	}
	else console.log(err)
});