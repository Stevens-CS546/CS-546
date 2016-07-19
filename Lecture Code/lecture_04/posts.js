const mongoCollections = require("./mongoCollections");
const posts = mongoCollections.posts;
const dogs = require("./dogs");

let exportedMethods = {
    getPostById(id) {
        return posts().then((postCollection) => {
            return postCollection.findOne({ _id: id });
        });
    },
    addPost(title, body, posterId) {
        return posts().then((postCollection) => {
            return dogs.getDogById(posterId)
                .then((dogThatPosted) => {
                    let newPost = {
                        title: title,
                        body: body,
                        poster: {
                            id: posterId,
                            name: dogThatPosted.name
                        }
                    };

                    return postCollection.insertOne(newPost).then((newInsertInformation) => {
                        return newInsertInformation.insertedId;
                    }).then((newId) => {
                        return this.getPostById(newId);
                    });
                });
        });
    },
    removePost(id) {
        return posts().then((postCollection) => {
            return postCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete post with id of ${id}`)
                }
            });
        });
    },
    updatePost(id, title, body, posterId) {
        return posts().then((postCollection) => {
            return dogs.getDogById(posterId)
                .then((dogThatPosted) => {
                    let updatedPost = {
                        title: title,
                        body: body,
                        poster: {
                            id: posterId,
                            name: dogThatPosted.name
                        }
                    };

                    return postCollection.updateOne({ _id: id }, updatedPost).then((result) => {
                        return this.getPostById(id);
                    });

                });
        });
    }
}

module.exports = exportedMethods;