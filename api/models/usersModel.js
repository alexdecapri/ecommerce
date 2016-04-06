var mongoose = require("mongoose");
var cartsModel = require("./cartsModel");
var ordersModel = require("./ordersModel");

var usersModel = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true, index: true},
  password: {type: String, required: true},
  cart: [cartsModel],
  orders: [ordersModel]
});

module.exports = mongoose.model("Users", usersModel);