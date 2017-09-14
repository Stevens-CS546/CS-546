const jsonFile = require("./jsonFileMod");

console.log("start of code");

let numVowelsInNames = 0;
let names = [];
let vowels = ["a", "e", "i", "o", "u"];

let readTeamFile = (file, callback) => {
  jsonFile.readJSON(file, callback);
};

jsonFile.readJSON("the-c-team.json", (error, asObject) => {
  if (error) throw error;

  asObject.forEach(person => {
    names.push(person.name.toLowerCase());
  });

  let nameData = {};

  for (let i = 0; i < names.length; i++) {
    let currentName = names[i];
    let currentNameVowels = 0;

    for (let i = 0; i < currentName.length; i++) {
      if (vowels.indexOf(currentName[i]) >= 0) {
        numVowelsInNames++;
        currentNameVowels++;
      }
    }

    nameData[currentName] = currentNameVowels;
  }

  console.log(nameData);

  jsonFile.writeJSON("name-data.json", nameData, (error, data) => {
    if (error) throw error;

    jsonFile.readJSON("name-data.json", (error, data) => {
      console.log(data);
      // do more work!
      // // on
      // // // and
      // // // // on
    });
  });

  console.log(`we have ${numVowelsInNames} vowels in their names`);
});

console.log("end of code");
