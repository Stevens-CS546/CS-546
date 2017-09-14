const bluebird = require("bluebird");
const Promise = bluebird.Promise;

const prompt = bluebird.promisifyAll(require("prompt"));
const fs = bluebird.promisifyAll(require("fs"));

// We declare an async function that we will run below, so that we may use await.
async function main() {
  const getFileOperation = {
    name: "fileName",
    description: "What file do you want to open?"
  };

  // Gets result of user input
  const promptResult = await prompt.getAsync([getFileOperation]);
  const fileName = promptResult.fileName;

  if (!fileName) {
    throw "Need to provide a file name";
  }

  console.log(`About to read ${fileName} if it exists`);
  const fileContent = await fs.readFileAsync(fileName, "utf-8");

  // Now we have the actual file data read
  const reversedContent = fileContent
    .split("")
    .reverse()
    .join("");

  const reversedName = `reversed_${fileName}`;

  await fs.writeFileAsync(reversedName, reversedContent);
  console.log("Finished!");

  return null;
}

// Now we run it
main();
