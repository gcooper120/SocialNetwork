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
require('./app/routes/login.js')(app,passport);

//Allowing CORS for development environment
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//Listening on port 3001
var listener = app.listen(3001, function(err){
	if (!err) {
		console.log("Starting server on port " + listener.address().port);
	}
	else console.log(err)
});