const express = require('express');
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/:id", (req, res) => {
    postData.getPostById(req.params.id).then((post) => {
        res.json(post);
    }, (error) => {
        // Not found!
        res.sendStatus(404);
    });
});

router.get("/", (req, res) => {
    postData.getAllPosts().then((postList) => {
        res.json(postList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.post("/", (req, res) => {
    // Not implemented
    res.sendStatus(501);
});

module.exports = router;