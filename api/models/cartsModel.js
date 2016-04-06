var mongoose = require("mongoose");


var cartsModel = new mongoose.Schema({
  products: [{ //change back to TRUEEEEE
    item: {type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true},
    quantity: {type: Number, min: 1}
  }]
});

module.exports = mongoose.model("Carts", cartsModel);
