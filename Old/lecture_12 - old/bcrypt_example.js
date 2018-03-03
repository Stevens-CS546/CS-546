const bcrypt = require("bcrypt-nodejs");
const plainTextPassword = "mySuperAwesomePassword";

const hash = bcrypt.hashSync(plainTextPassword);

// You may want to abstract this into a method for your own devices!
let hashedPassword = new Promise((resolve, reject) => {
  bcrypt.hash(plainTextPassword, null, null, function(error, hash) {
    if (error) {
      reject(error);
    } else {
      resolve(hash);
    }
  });
});

let compareFirstPassword = hashedPassword.then(function(hash) {
  return new Promise((resolve, reject) => {
    // Load hash from your password DB.
    bcrypt.compare("merlinsbeard", hash, function(error, res) {
      if (res === true) {
        console.log("merlinsbeard maches the hash");
        resolve(resolve);
      } else {
        reject(error);
        console.log("merlinsbeard does not match the hash");
      }
    });
  });
});

let compareSecondPassword = hashedPassword.then(function(hash) {
  return new Promise((resolve, reject) => {
    // Load hash from your password DB.
    bcrypt.compare("mySuperAwesomePassword", hash, function(err, res) {
      if (res === true) {
        console.log("mySuperAwesomePassword maches the hash");
        resolve(resolve);
      } else {
        reject(error);
        console.log("mySuperAwesomePassword does not match the hash");
      }
    });
  });
});
