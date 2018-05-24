//API end point for data related to authentication in the system.
module.exports = function(app, passport){

//Login route. Uses the passport strategy local-signin as middleware to authenticate signin.
//Redirects to isAuth to verify that the user is logged in.
app.post('/api/login', passport.authenticate('local-signin'), (req, res) => {
  res.redirect('/api/isAuth');
})

//New user route. Uses passport strategy local-signup as middleware to authenticate signup.
//Redirects to isAuth to verify that the user is logged in.
app.post('/api/newUser', passport.authenticate('local-signup'), (req, res) => {
  res.redirect('/api/isAuth');
}) 

//This route gets called whenever the client wants to see if the req is authorized to access a page.
//Status 200 has message of OK, we use the data (Connected or Not Connected) to determine if a user is authorized.
app.get('/api/isAuth', function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.status(200).send('Connected');
    } else {
        return res.status(200).send('Not connected');
    }
});

//Currently sends placeholder data when profile data is requested.
//This should query the database and return a users profile data.
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