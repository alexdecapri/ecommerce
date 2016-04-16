var mongoose = require("mongoose");
var cartsModel = require("./cartsModel");
var ordersModel = require("./ordersModel");
var bcrypt = require("bcrypt");
var q = require("q"); //because in node and the backend, we now need to require this (angular has it's own "q" built in library)

var usersModel = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  cart: [cartsModel],
  orders: [ordersModel]
});

//pre('save') is mongoose middleware that runs before every user is created
usersModel.pre('save', function(next) {
  var user = this;
  //take password and encrypt it
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      console.log('Password hash: ', hash); //don't do in production
      user.password = hash;
      next();
    });
  });
});

usersModel.methods.verifyPassword = function(password) {
  var deferred = q.defer();
  var user = this;
  bcrypt.compare(password, user.password, function(err, res) {
  if (err) {
    deferred.reject(false);
  } else {
    deferred.resolve(true);
  }
  });
  return deferred.promise;
};

module.exports = mongoose.model("Users", usersModel);
