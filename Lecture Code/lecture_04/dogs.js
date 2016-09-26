const mongoCollections = require("./mongoCollections");
const dogs = mongoCollections.dogs;

let exportedMethods = {
    // This is a fun new syntax that was brought forth in ES6, where we can define
    // methods on an object with this shorthand!
    getDogById(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return dogs().then((dogCollection) => {
            return dogCollection.findOne({_id: id});
        });
    },
    addDog(name, breeds) {
        if (!name) 
            return Promise.reject("You must provide a name for your dog");
        
        if (!breeds || !Array.isArray(breeds)) 
            return Promise.reject("You must provide an array of breeds");
        
        if (breeds.length === 0) 
            return Promise.reject("You must provide at least one breed.");
        
        return dogs().then((dogCollection) => {
            let newDog = {
                name: name,
                breeds: breeds
            };

            return dogCollection
                .insertOne(newDog)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                })
                .then((newId) => {
                    return this.getDogById(newId);
                });
        });
    },
    removeDog(id) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        return dogs().then((dogCollection) => {
            return dogCollection
                .removeOne({_id: id})
                .then((deletionInfo) => {
                    if (deletionInfo.deletedCount === 0) {
                        throw(`Could not delete dog with id of ${id}`)
                    }
                });
        });
    },
    updateDog(id, name, breeds) {
        if (!id) 
            return Promise.reject("You must provide an id to search for");
        
        if (!breeds || !Array.isArray(breeds)) 
            return Promise.reject("You must provide an array of breeds");
        
        if (breeds.length === 0) 
            return Promise.reject("You must provide at least one breed.");
        
        return dogs().then((dogCollection) => {
            let updatedDog = {
                name: name,
                breeds: breeds
            };

            return dogCollection.updateOne({
                _id: id
            }, updatedDog).then(() => {
                return this.getDogById(id);
            });
        });
    }
}

module.exports = exportedMethods;