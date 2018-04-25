var express 			= require("express"),
		app 					= express(),
		passport			= require("passport"),
		session				= require("express-session"),
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


//Passport Configuration
app.use(session({ secret: 'adsvokw0942nv9204231va2',resave: true, saveUninitialized:true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

//Models
var models = require("./app/models");

//Routes
var authRoute = require('./app/routes/auth.js')(app, passport);
var homeRoute = require('./app/routes/test.js')(app);

//load Passport strategies
require('./app/config/passport/passport.js')(passport, models.user);
 
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


//Temporary for tutorial
app.post('/api/test', (req, res) => {
  console.log(req.body)
  r = req.body.password + req.body.username
  res.send(r)
})

app.get('/api/profile', (req, res) => {
  res.send("https://s3.us-east-2.amazonaws.com/socialnetworkimagesgcc/alex-holyoake-361916-unsplash.jpg");
})
app.get('/api/jokes/food', (req, res) => {
  let foodJokes = [
  {
    id: 99991,
    joke: "When Chuck Norris was a baby, he didn't suck his mother's breast. His mother served him whiskey, straight out of the bottle."
  },
  {
    id: 99992,
    joke: 'When Chuck Norris makes a burrito, its main ingredient is real toes.'
  },
  {
    id: 99993,
    joke: 'Chuck Norris eats steak for every single meal. Most times he forgets to kill the cow.'
  },
  {
    id: 99994,
    joke: "Chuck Norris doesn't believe in ravioli. He stuffs a live turtle with beef and smothers it in pig's blood."
  },
  {    id: 99995,
    joke: "Chuck Norris recently had the idea to sell his urine as a canned beverage. We know this beverage as Red Bull."
  },
  {
    id: 99996,
    joke: 'When Chuck Norris goes to out to eat, he orders a whole chicken, but he only eats its soul.'
  }
  ];
  res.json(foodJokes);
})
//Listening on port 3001
var listener = app.listen(3001, function(err){
	if (!err) {
		console.log("Starting server on port " + listener.address().port);
	}
	else console.log(err)
});