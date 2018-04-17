module.exports = function(app) {
  app.get('/test', function(req, res, next) {
    res.json([{
     id: 1,
     username: "samsepi0l"
    }, {
     id: 2,
     username: "D0loresH4ze"
    }]);
  });  
}