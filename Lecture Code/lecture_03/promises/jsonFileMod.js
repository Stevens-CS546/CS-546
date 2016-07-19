const fs = require('fs');

let jsonFileMod = exports = module.exports;

jsonFileMod.readJSON = (fileName) => {
    return new Promise((fulfill, reject) => {
        if (!fileName) throw "No file name provided";

        fs.readFile(fileName, "utf-8", (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            try {
                let jsonData = JSON.parse(data);
                fulfill(jsonData);
            } catch (parsingError) {
                reject(parsingError);
            }
        });
    })
};

jsonFileMod.writeJSON = (fileName, data) => {
    return new Promise((fulfill, reject) => {
        if (!fileName) throw "No file name provided";

        fs.writeFile(fileName, JSON.stringify(data, null, 4), (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            fulfill(data);
        });
    });
};

