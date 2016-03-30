// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var mongojs = require("mongojs");
// var mongoose = require("mongoose");

// Express
var app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connections
var port = 8000;
app.listen(port, function() {
  console.log("Listening on port: " + port);
});

// Mongo (using mongoJS)
var db = mongojs("ecommerce", ["products"]); //products is a collection of the ecommerce database
// var Product = db.products; is this right?

// Mongo (using mongoose)
// var Schema = mongoose.Schema;
// var mongoUri = "mongodb://localhost:27017/ecommerce";
// mongoose.set("debug", true);
// mongoose.connect(mongoUri);
// var db = mongoose.connection;
// db.once("open", function() {
//   console.log("Connected to MongoDB at port: " + port); //connected here or at 27017?
// });
// db.on("error", function(err) {
//   if (err) {
//     console.log("Error with MongoDB is: " + err);
//   }
// });

// Endpoints
app.get("/api/products", function(req, res) {
  res.send("Test GET for /api/products");
});
app.get("/api/products/:id", function(req, res) {
  res.send("Test GET for /api/products using req.params.id!");
});
app.post("/api/products", function(req, res) {
  db.products.insert(req.body, function(err, result) {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});
app.put("/api/products/:id", function(req, res) {
  res.send("Test PUT for /api/products using req.params.id!");
});
app.delete("/api/products/:id", function(req, res) {
  res.send("Test string in DELETE for /api/products using req.params.id!");
});
