var User = require("../models/usersModel");

module.exports = {

  // 'use strict';

  create: function(req, res) {
    User.findOne({email: req.body.email})
    .exec(function(err, user) {
      //If we found a user, it's a duplicate:
      if (user) {
        return res.status(400).json({message: 'User with this email already exists!'});
      }
      //If the user's password is too short
      if (req.body.password.length <= 5) {
        return res.status(400).json({message: 'Your password must be longer than five characters!'});
      }
      //Otherwise, create user
      User.create(req.body, function(err, newUser) {
        if (err) {
          res.status(500).json(err);
        } else {
          res.status(200).json(newUser);
        }
      });
    });
  },

  login: function(req, res) {
    res.status(200).json(req.user);
  },

  loggedin: function(req, res) {
    res.json(req.isAuthenticated() ? req.user : '0'); //isAuthenticated is from passport
  },

  logout: function(req, res) {
    req.logOut();
    res.redirect('/');
  },

  // create: function(req, res) {
  //   console.log(req.body);
  //   var newUser = new User(req.body);
  //   newUser.save(function(err, result) {
  //     if (err) res.status(500).send(err);
  //     else res.json(result);
  //   });
  // },

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
