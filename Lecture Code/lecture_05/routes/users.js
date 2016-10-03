const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
    }, (error) => {
        // Not found!
        res.status(404).json({message: "not found!"});
    });
});

router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    // Not implemented
    res.status(501).send();
});

module.exports = router;