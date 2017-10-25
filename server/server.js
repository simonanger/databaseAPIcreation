var express = require("express");
var app = express();

var countriesRouter = require("./controllers/countries_controller.js");
app.use(countriesRouter);

app.listen(3000, function() {
  console.log("running on 3000");
})
