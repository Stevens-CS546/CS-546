const peopleRoutes = require("./people");
const eventRoutes = require("./events");
const locationRoutes = require("./locations");

const path = require("path");

const constructorMethod = app => {
  app.use("/people", postRoutes);
  app.use("/events", eventRoutes);
  app.use("/locations", locationRoutes);

  app.use("*", (req, res) => {
    // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
    let route = path.resolve(`static/about.html`);
    res.sendFile(route);

    // You could also do res.status(num).render(template, data)
  });
};

module.exports = constructorMethod;
