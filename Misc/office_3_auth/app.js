const dataMod = require("./data");
const login = dataMod.login;

const userName = "Phil";
const password = "banana";

let fakeCookie = { sessionId: null };

let createUser = login.create(userName, password).then(user => {
  console.log(user);
  return user;
});

let loginAsUser = createUser.then(() => {
  return login.authenticateUser(userName, password);
});

let getSessionId = loginAsUser.then(user => {
  fakeCookie.sessionId = user.sessionId;

  return user.sessionId;
});

let getUserBySessionId = getSessionId
  .then(() => {
    return login.getUserBySessionId(fakeCookie.sessionId);
  })
  .then(user => {
    console.log("user is:");
    console.log(user);
  });
