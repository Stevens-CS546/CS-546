const peopleRoutes = require("./login");

const path = require("path");

const constructorMethod = app => {
  app.use("/login", loginRoutes);

  app.use("*", (req, res) => {
    // any unmatched routes (ie, pages that do not exist) will hit this catch-all route
    let route = path.resolve(`static/about.html`);
    res.sendFile(route);

    // You could also do res.status(num).render(template, data)
  });
};

module.exports = constructorMethod;
