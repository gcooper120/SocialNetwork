var express 	      = require("express"),
		app	     	  = express(),
		bodyParser 	  = require("body-parser"),
		mysql		  = require("mysql2"),
		env			  = require('dotenv').load(),
        AWS           = require('aws-sdk'),
        passport      = require('passport'),
        session       = require('express-session');

AWS.config.region = 'us-east-2';
s3 = new AWS.S3();


//BodyParser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport Config
app.use(session({
  secret: 'Mouse trap hunter',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Models
var models = require("./app/models");

//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});


//Routes

//Allowing CORS for development environment
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


require('./app/routes/login.js')(app,passport);
require('./app/routes/profileData.js')(app, models.user, models.photo);

//Listening on port 3001
var listener = app.listen(3001, function(err){
	if (!err) {
		console.log("Starting server on port " + listener.address().port);
	}
	else console.log(err)
});