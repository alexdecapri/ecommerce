var Order = require("../models/ordersModel");
var User = require("../models/usersModel");


module.exports = {

  create: function(req, res) {
    var userId = req.params.user_id;
    User.findById(userId, function(err, result) {
      if (err) res.status(500).send(err);
      else res.send(result);
      var userObj = result;
      var userOrder = {};
      userOrder.products = userObj.cart;
      userOrder.userId = userId;
      var newOrder = new Order(userOrder);
      newOrder.save(function(err, result) {
        if (err) res.status(500).send(err);
        userObj.cart = [];
        userObj.orders.push(mongoose.Types.ObjectId(result._id));
        //userObj.update({$push: {orders: mongoose.Types.ObjectId(result._id)}})
        userObj.save(function(err, result) {
          if (err) res.status(500).send(err);
          else res.send(result);
        });
      });
    })
  }


};
