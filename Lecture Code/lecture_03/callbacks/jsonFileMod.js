const fs = require('fs');

let jsonFileMod = exports = module.exports;

jsonFileMod.readJSON = (fileName, callback) => {
    fs.readFile(fileName, "utf-8", (error, data) => {
        callback(error, JSON.parse(data));
    });
};

jsonFileMod.writeJSON = (fileName, data, callback) => {
    fs.writeFile(fileName, JSON.stringify(data, null, 4), callback);
};

