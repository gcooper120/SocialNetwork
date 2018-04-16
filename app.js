var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser"),
		mysql				= require("mysql");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//mySQL connection
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'Social Network'
});

connection.connect()

connection.query('SELECT * from user', function (err, rows, fields) {
  if (err) throw err

  console.log('Successfully connected to db if "First user" shows up.: ', rows[0].about)
})

connection.end()

// Landing Page route
app.get("/", function(req,res){
	res.render("landing");
});



//Listening on port 3000
app.listen(3000, function(){
	console.log("Starting Server");
});