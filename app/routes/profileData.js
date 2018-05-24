//Currently sends placeholder data when profile data is requested.
//This should query the database and return a users profile data.
module.exports = function(app, user, photo) {
  var User = user;
  var Photo = photo;
  app.get('/api/profileData', (req, res) => {
    console.log(req.user);
    User.findOne({
          where: {
            user_id: req.user
          }
        }).then(function(user) {
          var data = {
            name: user.name,
            aboutText: user.about,
          }
          if (user.city) {
            data.city = user.city;
          } else {
            data.city = "NA";
          }
          if (user.state) {
            data.state = user.state;
          } else {
            data.state = "NA";
          }
          if (user.country) {
            data.country = user.country;
          } else {
            data.country = "NA";
          }
          if (user.dateofBirth) {
            data.dateofBirth = user.dateofBirth;
          } else {
            var d = new Date();
            data.dateOfBirth = d.toJSON();
          }
          Photo.findOne({
            where: {
              photo_id: user.profilePic
            }
          }).then(function(p) {
            data.profPicUrl = p.address;
            res.send(data)
          });
        });
  })

}