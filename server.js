// initialize server

// express helps with routing
var express = require("express");

// bodyParser gives back a JSON obj
// for the body of the client's request
// so that the body can be easily manupulated
var bodyParser = require("body-parser");


// create an express server
var app = express();

var PORT = process.env.PORT || 3000;

// set up Express to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router
// require the routing files so 
// that the server knows how to respond
// when users visits or requests
// data from various URLs

// the route files return back all the 
// get/post requests

require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
