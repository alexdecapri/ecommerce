// Dependencies
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var cors = require("cors");
var mongoose = require("mongoose");
var passport = require("passport");

// Express
var app = express();

// Middleware
app.use("/", bodyParser.json()); //the "/" means use the middleware for ALL routes
app.use(cors());
app.use(morgan("dev"));
// app.use(session({
//
// }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public")); //serves local files

// Connections
var port = 8000;
app.listen(port, function() {
  console.log("Listening on port: " + port);
});

// Middleware required for Passport
require('./configs/passport.js')(passport); // pass passport object for configuration
app.use(session({
    secret: 'putasecrethere',
    resave: true,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

/* Middelware function to be used for every secured route*/
var auth = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(401).end();
    } else {
        next();
    }
};

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
app.post('/api/user/register', UserModelCtrl.create);
app.post('/api/user/login',passport.authenticate('local'), UserModelCtrl.login);
app.get('/api/user/logout', UserModelCtrl.logout);
app.get('/api/user/loggedin', UserModelCtrl.loggedin)

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
app.get("/api/user/:email", UserModelCtrl.locate);
