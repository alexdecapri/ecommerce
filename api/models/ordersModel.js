var mongoose = require("mongoose");
var productsModel = require("./productsModel");

var ordersModel = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true}, //where does User come from?
  products: [{
    item: [productsModel],
    quantity: {type: Number, required: true, min: 1}
  }],
  ordered: {type: Date, default: new Date()}
});

module.exports = mongoose.model("Orders", ordersModel);
