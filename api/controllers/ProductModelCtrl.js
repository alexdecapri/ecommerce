var Product = require("../models/productsModel");

module.exports = {

  create: function(req, res) {
    var newProduct = new Product(req.body);
    newProduct.save(function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  },

  read: function(req, res) {
    console.log("req.query: ", req.query);
    var id = req.query.id
    if (id) {
      Product.find({_id: id}).exec(function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
      })
    }
    else {
      Product.find({}).exec(function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
      })
    }
  },

  update: function(req, res) {
    console.log(req.params.id, req.body);
    Product.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, result) { //new: true is an option that makes the response give the newly editted object, not the old one
      if (err) res.status(500).send(err);
      else {
        console.log(result);
        res.status(200).json(result);
      }
    });
  },

  delete: function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  }

};
