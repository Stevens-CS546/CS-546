const express = require("express");
const router = express.Router();
const xss = require("xss");

router.post("/todo", function(request, response) {
  console.log(request.body);
  response.json({ success: true, message: xss(request.body.description) });
});

router.post("/todo.html", function(request, response) {
  console.log(request.body);
  response.send("<div>" + xss(request.body.description) + "</div>");
});

module.exports = router;
