//Loops through every file in the routes directory and requires them.
//Used in app.js when we want to import all routes.
var fs = require('fs');

module.exports = function(app){
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == "index.js") return;
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name)(app);
    });
}