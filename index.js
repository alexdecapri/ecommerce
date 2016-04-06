// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongoose = require("mongoose");

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public")); //serves local files

// Connections
var port = 8000;
app.listen(port, function() {
  console.log("Listening on port: " + port);
});

// Mongo (using mongoose)
var mongoUri = "mongodb://localhost:27017/ecommerce";
mongoose.set("debug", true);
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.once("open", function() {
  console.log("Connected to MongoDB at port: " + 27017);
});
db.on("error", function(err) {
  if (err) {
    console.log("Error with MongoDB is: " + err);
  }
});

var ProductModelCtrl = require("./api/controllers/ProductModelCtrl");
var UserModelCtrl = require("./api/controllers/UserModelCtrl");
var CartModelCtrl = require("./api/controllers/CartModelCtrl");
var OrderModelCtrl = require("./api/controllers/OrderModelCtrl");

// Endpoints
app.get("/api/products", ProductModelCtrl.read); //now using queries instead of params
app.post("/api/products", ProductModelCtrl.create);
app.put("/api/products/:id", ProductModelCtrl.update);
app.delete("/api/products/:id", ProductModelCtrl.delete);

app.post("/api/user", UserModelCtrl.create); //not in project guide...???
app.post("/api/order/:user_id", OrderModelCtrl.create);
app.get("/api/order", OrderModelCtrl.read);
app.post("/api/cart/:user_id", CartModelCtrl.create);
app.put("/api/cart/:user_id", CartModelCtrl.update);
app.get("/api/user/:user_id", UserModelCtrl.read);
