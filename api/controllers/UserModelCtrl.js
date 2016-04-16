var User = require("../models/usersModel");

module.exports = {

  create: function(req, res) {
    console.log(req.body);
    var newUser = new User(req.body);
    newUser.save(function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  },

  read: function(req, res) {
    console.log(req.params)
    //"User" below refers to variable defined above which references usersModel
    User.findById(req.params.user_id).populate("cart/products").exec()
      .then(function(result) {
        res.status(200).json(result);
      }, function(err) {
        res.status(500).send(err);
      })
  },

  locate: function(req, res) {
    console.log(req.params);
    var email = req.body
    User.find({email: email}).exec(function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    })
  }

};
