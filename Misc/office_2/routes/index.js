var peopleRoutes = require("./people");
var eventRoutes = require("./events");
var locationRoutes = require("./locations");

var path = require("path");

var constructorMethod = app => {
  app.use("/people", peopleRoutes);
  app.use("/events", eventRoutes);
  app.use("/locations", locationRoutes);

  app.use("*", (req, res) => {
    // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
    //var route = path.resolve(`static/about.html`);
    //res.sendFile(route);
    res.status(404).send("Page Not Found");
    // You could also do res.status(num).render(template, data)
  });
};

module.exports = constructorMethod;
