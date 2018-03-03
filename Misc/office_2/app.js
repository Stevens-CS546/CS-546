var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var static = express.static(__dirname + "/public");

var configRoutes = require("./routes");

var exphbs = require("express-handlebars");

var Handlebars = require("handlebars");

var handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

app.use("/public", static);
app.use(bodyParser.json());

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
