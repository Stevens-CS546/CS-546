const postRoutes = require("./posts");
const userRoutes = require("./users");
const path = require('path');

const constructorMethod = (app) => {
    app.use("/posts", postRoutes);
    app.use("/users", userRoutes);

    app.use("*", (req, res) => {
        let route = path.resolve(`static/about.html`);
        res.sendFile(route);
    })
};

module.exports = constructorMethod;