module.exports = function(app, passport){

app.post('/api/login', (req, res) => {
  console.log(req.body)
  res.send("Reached Login Route");
})

app.post('/api/newUser', passport.authenticate('local-signup'), (req, res) => {
  res.redirect('/api/isAuth')
}) 

app.get('/api/isAuth', function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(200).send('Connected');
    } else {
        return res.status(401).send('Not connected');
    }
});

app.get('/api/profileData', (req, res) => {
  data = {
    name: "Name Placeholder",
    profPicUrl: "https://s3.us-east-2.amazonaws.com/socialnetworkimagesgcc/alex-holyoake-361916-unsplash.jpg",
    aboutText: "Lorem ipsum",
    city: "City placeholder",
    state: "State placeholder",
    country: "Country placeholder",
    birthday: "Birthday placeholder"
  }
  res.send(data)
})

}