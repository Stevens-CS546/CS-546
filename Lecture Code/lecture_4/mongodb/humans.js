const mongoCollections = require("./mongoCollections");
const humans = mongoCollections.humans;

let exportedMethods = {
    getHumanById(id) {
        return humans().then((humanCollection) => {
            return humanCollection.findOne({ _id: id });
        });
    },
    addHuman(firstName, lastName) {
        return humans().then((humanCollection) => {
            let newHuman = {
                firstName: firstName,
                lastName: lastName,
                dogs: []
            };

            return humanCollection.insertOne(newHuman).then((newInsertInformation) => {
                return newInsertInformation.insertedId;
            }).then((newId) => {
                return this.getHumanById(newId);
            });
        });
    },
    removeHuman(id) {
        return humans().then((humanCollection) => {
            return humanCollection.removeOne({ _id: id }).then((deletionInfo) => {
                if (deletionInfo.deletedCount === 0) {
                    throw (`Could not delete user with id of ${id}`)
                }
            });
        });
    },
    updateHuman(id, firstName, lastName) {
        
    }
}

exportedMethods.addHuman("Phil", "Barresi").then(console.log);

module.exports = exportedMethods;