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
    Product.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  },

  delete: function(req, res) {
    Product.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  }

};
