const express = require('express');
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/:id", (req, res) => {
    userData.getUserById(req.params.id).then((user) => {
        res.json(user);
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });
});

router.get("/", (req, res) => {
    userData.getAllUsers().then((userList) => {
        res.json(userList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    let userInfo = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to create a user" });
        return;
    }

    if (!userInfo.firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!userInfo.lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    userData.addUser(userInfo.firstName, userInfo.lastName)
        .then((newUser) => {
            res.json(newUser);
        }, () => {
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let userInfo = req.body;

    if (!userInfo) {
        res.status(400).json({ error: "You must provide data to update a user" });
        return;
    }

    if (!userInfo.firstName) {
        res.status(400).json({ error: "You must provide a first name" });
        return;
    }

    if (!userInfo.lastName) {
        res.status(400).json({ error: "You must provide a last name" });
        return;
    }

    let getUser = userData.getUserById(req.params.id).then(() => {
        return userData.updateUser(req.params.id, userInfo)
            .then((updatedUser) => {
                res.json(updatedUser);
            }, (error) => {
                console.log(error);
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "User not found" });
    });

});

router.delete("/:id", (req, res) => {
    let user = userData.getUserById(req.params.id).then(() => {
        return userData.removeUser(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch((err) => {
        console.log(err);
        res.status(404).json({ error: "User not found" });
    });
});

module.exports = router;