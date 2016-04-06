var Cart = require("../models/cartsModel");
var User = require("../models/usersModel");

module.exports = {

  create: function(req, res) {
    console.log(req.params.user_id, req.body);
    User.findByIdAndUpdate(req.params.user_id, {$push: {Cart: req.body}}, function(err, result) {
      if (err) res.status(500).send(err);
      else res.json(result);
    });
  },

  update: function(req, res) {
    User.findById(req.params.user_id, function(err, result) {
      if (err) res.status(500).send(err);
      var myUser = result;
      var qty = req.query.qty / 1;
      var foundItem = -1;
      myUser.Cart.forEach(function(cartItem, index)  {
        if (cartItem._id.toString() === req.query.itmId) {
          foundItem = index
        }
      })
      if (foundItem >= 0) {
        console.log("Found Item = " + foundItem);
        if (qty === 0) {
          myUser.Cart.splice(foundItem, 1);
        } else {
          myUser.Cart[foundItem].qty = qty;
        }
      }
      saveUser(myUser, req, res);
    })
    function saveUser(userToSave, req, res) {
      userToSave.save(function(err, result) {
        if (err) res.status(500).send(err);
        else res.send(result);
      })
    }
  }


};
