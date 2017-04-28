// We first require our express package
var express = require('express');
var bodyParser = require('body-parser');
var todoData = require('./data.js');
var xss = require("xss");

// This package exports the function to create an express instance:
var app = express();

// We can setup Jade now!
app.set('view engine', 'ejs');

// This is called 'adding middleware', or things that will help parse your request
app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// This middleware will activate for every request we make to 
// any path starting with /assets;
// it will check the 'static' folder for matching files 
app.use('/assets', express.static('static'));

// Setup your routes here!

app.post("/api/todo", function(request, response) {
    console.log(request.body); 
    response.json({success: true, message: xss(request.body.description)});
});

app.post("/api/todo.html", function(request, response) {
    console.log(request.body);
    response.send("<div>" + xss(request.body.description) + "</div>");
});

app.get("/", function (request, response) { 
    // We have to pass a second parameter to specify the root directory
    // __dirname is a global variable representing the file directory you are currently in
    response.render("pages/home", { pageTitle: "So Much ToDo!", todoItems: todoData.getAll() });
});

// We can now navigate to localhost:3000
app.listen(3000, function () {
    console.log('Your server is now listening on port 3000! Navigate to http://localhost:3000 to access it');
});
