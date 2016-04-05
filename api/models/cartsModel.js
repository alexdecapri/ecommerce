var mongoose = require("mongoose");

var cartsModel = new mongoose.Schema({
  products: [{
    item: {type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true},
    quantity: {type: Number, min: 1}
  }]
});

module.exports = mongoose.model("Carts", cartsModel);
