const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const uuid = require("node-uuid");

module.exports = {
  create(userName, password) {
    return users().then(userCollection => {
      let newUser = {
        name: userName,
        password: password,
        sessionId: uuid.v4(),
        _id: uuid.v4()
      };

      return userCollection
        .insertOne(newUser)
        .then(newInsertInformation => {
          return newInsertInformation.insertedId;
        })
        .then(newId => {
          return module.exports.getUserById(newId);
        });
    });
  },
  getUserById(userId) {
    return users().then(userCollection => {
      return userCollection.findOne({ _id: userId });
    });
  },
  getUserBySessionId(sessionId) {
    return users().then(userCollection => {
      return userCollection.findOne({ sessionId: sessionId });
    });
  },
  authenticateUser: function(userName, password) {
    return users().then(userCollection => {
      return userCollection
        .findOne({ name: userName, password: password })
        .then(function(user) {
          if (!user) throw "User not found";

          user.sessionId = uuid.v4();

          return userCollection
            .updateOne({ _id: user._id }, user)
            .then(function() {
              return user;
            });
        });
    });
  }
};
