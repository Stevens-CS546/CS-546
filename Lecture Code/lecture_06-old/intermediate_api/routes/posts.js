const express = require('express');
const router = express.Router();
const data = require("../data");
const postData = data.posts;

router.get("/:id", (req, res) => {
    postData.getPostById(req.params.id).then((post) => {
        res.json(post);
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

router.get("/tag/:tag", (req, res) => {
    postData.getPostsByTag(req.params.tag).then((postList) => {
        res.json(postList);
    });
});

router.get("/", (req, res) => {
    postData.getAllPosts().then((postList) => {
        res.json(postList);
    }).catch((e) => {
        res.status(500).json({ error: e });
    });
});

router.post("/", (req, res) => {
    let blogPostData = req.body;

    postData.addPost(blogPostData.title, blogPostData.body, blogPostData.tags, blogPostData.posterId)
        .then((newPost) => {
            res.json(newPost);
        }).catch((e) => {
            res.status(500).json({ error: e });
        });
});

router.put("/:id", (req, res) => {
    let updatedData = req.body;

    let getPost = postData.getPostById(req.params.id);

    getPost.then(() => {
        return postData.updatePost(req.params.id, updatedData)
            .then((updatedPost) => {
                res.json(updatedPost);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });

});

router.delete("/:id", (req, res) => {
    let getPost = postData.getPostById(req.params.id);

    getPost.then(() => {
        return postData.removePost(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch((e) => {
                res.status(500).json({ error: e });
            });
    }).catch(() => {
        res.status(404).json({ error: "Post not found" });
    });
});

module.exports = router;