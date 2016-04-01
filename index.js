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
app.use(express.static("public")); //serves local files

// Connections
var port = 8000;
app.listen(port, function() {
  console.log("Listening on port: " + port);
});

// Mongo (using mongoJS)
var db = mongojs("ecommerce", ["products"]); //products is a collection of the ecommerce database
db.on("error", function(err) {
  console.log("Database error: " + err)
});
db.on("connect", function() {
  console.log("Mongo database connected");
});

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
  // var query = req.query;
  db.products.find(req.query, function (err, result) { //empty object means no criteria, want all records in collection
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

app.get("/api/products/:id", function(req, res) {
  var id = req.params.id;
  var convertedId = mongojs.ObjectId(id); //turns string into ObjectId type
  var objId = {
    _id: convertedId
  };
  // console.log(userId);
  db.products.findOne(objId, function(err, result) {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

app.post("/api/products", function(req, res) {
  db.products.insert(req.body, function(err, result) {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

app.put("/api/products/:id", function(req, res) {
  var id = req.params.id;
  var query = {
    _id: mongojs.ObjectId(id)
  };
  db.products.update(query, req.body, function(err, result) {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

app.delete("/api/products/:id", function(req, res) {
  var id = req.params.id;
  var query = {
    _id: mongojs.ObjectId(id)
  };
  db.products.remove(query, function(err, result) {
    console.log(err);
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});
