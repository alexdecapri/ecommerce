var mongoose = require("mongoose");

var productsModel = new mongoose.Schema({
  name: {type: String, required: true, unique: true, index: true},
  description: {type: String, required: true},
  price: {type: Number, required: true, min: 0}
});

module.exports = mongoose.model("Products", productsModel);
