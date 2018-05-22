var express 			= require("express"),
		app 					= express(),
		bodyParser 		= require("body-parser"),
		mysql					= require("mysql2");
		env						= require('dotenv').load(),
		exphbs 				= require('express-handlebars'),
    AWS           = require('aws-sdk');

AWS.config.region = 'us-east-2';
s3 = new AWS.S3();

//Handlebars config
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//BodyParser Config
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Models
var models = require("./app/models");

//Sync Database
models.sequelize.sync().then(function() {
 
    console.log('Nice! Database looks fine')
 
}).catch(function(err) {
 
    console.log(err, "Something went wrong with the Database Update!")
 
});

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


app.post('/api/login', (req, res) => {
  console.log(req.body)
  res.send("Reached Login Route");
})

app.post('/api/newUser', (req, res) => {
  console.log(req.body)
  res.send("We made it!")
})

app.get('/api/profile', (req, res) => {
  res.send("https://s3.us-east-2.amazonaws.com/socialnetworkimagesgcc/alex-holyoake-361916-unsplash.jpg");
})

//Listening on port 3001
var listener = app.listen(3001, function(err){
	if (!err) {
		console.log("Starting server on port " + listener.address().port);
	}
	else console.log(err)
});