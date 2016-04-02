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

// Endpoints
app.get("/api/products", ProductModelCtrl.read); //now using queries instead of params
app.post("/api/products", ProductModelCtrl.create);
app.put("/api/products/:id", ProductModelCtrl.update);
app.delete("/api/products/:id", ProductModelCtrl.delete);
