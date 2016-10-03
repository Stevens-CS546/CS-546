const express = require('express');
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/:id", (req, res) => {
    postData.getPostById(req.params.id).then((post) => {
        res.json(post);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "Post not found"});
    });
});

router.get("/", (req, res) => {
    postData.getAllPosts().then((postList) => {
        res.json(postList);
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