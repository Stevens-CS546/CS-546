const dogs = require("./dogs");
const posts = require("./posts");
const connection = require("./mongoConnection");

let addSasha = dogs.addDog("Sasha", ["Cheagle", "Chihuaha", "Beagle"]);

let sashasFirstPost = addSasha.then((sasha) => {
    console.log("Sasha the dog has been added, now she will blog!");
    console.log(sasha);

    return posts.addPost("A Review of Bleu d'Auvergne", "It was 2014 when I was born, and it was 2014 when I received my first taste of Bleu d'Auvergne. I dined upon the delicacy at the home of my grand-papa, known as The Cheese Man for the great varieties of cheese he kept in his abode. I still do not know if the Bleu d'Auvergne was what ignited my love of cheese, or if it was the strange diet of my papa whom kept away from the starches and sugars and replaced them with cheeses and legumes. But truly, I will never forget the strange world of the first taste of Bleu d'Auvergne, to this day the greatest cheese I have ever tasted. It paired very nicely with the cheeseburger I stole from my papa's four year old cousin. No one believed him. It was the perfect crime.", sasha._id);
});

let updatingSashasFirstPost = sashasFirstPost.then((post) => {
    return posts.updatePost(post._id, "For Love of Bleu d'Auvergne", post.body, post.poster.id);
});

let removeTheFirstPostAfterUpdate = updatingSashasFirstPost.then((updatedPost) => {
    console.log("Now, the post is:");
    console.log(updatedPost);
    console.log("That's all, folks!");

    return posts.removePost(updatedPost._id);
});

let otherThingToDo = updatingSashasFirstPost.then((updatedPost) => {
    // ..
})

removeTheFirstPostAfterUpdate.then(() => {
    return connection();
}).catch((err) => {
    console.error(err);
    return connection();
}).then((db) => {
    return db.close();
}).then(() => {
    let temp = process._getActiveRequests();
    let otherTemp = process._getActiveHandles();

    console.log(temp);
    console.log(otherTemp);
})
