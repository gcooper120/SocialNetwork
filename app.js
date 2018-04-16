var express 		= require("express"),
		app 				= express(),
		bodyParser 	= require("body-parser");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));



// Landing Page route
app.get("/", function(req,res){
	res.render("landing");
});



//Listening on port 3000
app.listen(3000, function(){
	console.log("Starting Server");
});