const mongoCollections = require("./mongoCollections");
const dogs = mongoCollections.dogs;

let exportedMethods = {
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getDogById(id) {
        return dogs().then((dogCollection) => {
            return dogCollection.findOne({ _id: id });
        });
    },
    addDog(name, breeds) {
        return dogs().then((dogCollection) => {
            let newDog = {
                name: name,
                breeds: breeds
            };

            return dogCollection.insertOne(newDog).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getDogById(newId);
            });
        });
    },
    removeDog(id) {
        return dogs().then((dogCollection) => {
            return dogCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete dog with id of ${id}`)
                }
            });
        });
    },
    updateDog(id, name, breeds) {
        return dogs().then((dogCollection) => {
            let updatedDog = {
                name: name,
                breeds: breeds
            };

            return dogCollection.updateOne({ _id: id }, updatedDog).then(() => {
                return this.getDogById(id);
            });
        });
    }
}

module.exports = exportedMethods;