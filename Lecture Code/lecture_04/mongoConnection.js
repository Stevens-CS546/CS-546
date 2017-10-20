const MongoClient = require("mongodb").MongoClient;
const settings = require("./settings");
const mongoConfig = settings.mongoConfig;

let fullMongoUrl = `${mongoConfig.serverUrl}${mongoConfig.database}`;
let _connection = undefined;

module.exports = async () => {
  if (!_connection) {
    _connection = await MongoClient.connect(fullMongoUrl);
  }

  return _connection;
};
