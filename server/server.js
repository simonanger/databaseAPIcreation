var express = require("express");
var app = express();
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



var countriesRouter = require("./controllers/countries_controller.js");
app.use("/api/countries", countriesRouter);

app.use(express.static(__dirname + "/../public"))

app.listen(3000, function() {
  console.log("running on 3000");
})
