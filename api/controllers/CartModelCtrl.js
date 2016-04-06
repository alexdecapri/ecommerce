var Cart = require("../models/cartsModel");

module.exports = {

  create: function(req, res) {
    console.log(req.params.user_id, req.body);
    Users.findByIdAndUpdate(req.params.user_id, {$push: {cart: req.body}}, function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  },

  update: function(req, res) {

  }

};
