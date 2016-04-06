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
    Users.findById(req.params.user_id).population("cart/products").exec()
      .then(function(result) {
        res.status(200).json(result);
      }, function(err) {
        res.status(500).send(err);
      })
  }

};
