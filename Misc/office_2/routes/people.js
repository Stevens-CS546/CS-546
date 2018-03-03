var express = require("express");
var router = express.Router();
var data = require("../data");
var people = data.people;
var events = data.events;

// Single Person Page
router.get("/:id", (req, res) => {
  // Find a person by the provided id,
  // then display their information
  // As well as listing all events that they will be attending
  // Each of these events need to link to the event page, and show the event name
  // If a person is not found, display the 404 error page
  people
    .getPerson(parseInt(req.params.id))
    .then(personObj => {
      Promise.all([
        personObj,
        events.getEventsForAttendee(parseInt(personObj.id))
      ]).then(results => {
        var peopleObj = {
          id: null,
          name: null,
          events: []
        };
        peopleObj.id = personObj.id;
        peopleObj.name = personObj.name;
        peopleObj.events = results[1];
        //console.log(results[1].length + " Array length");
        //console.log(peopleObj);
        res.render("people/singleEvent", { person: peopleObj });
      });
    })
    .catch(() => {
      res.status(404).send("Person Not Found");
    });
});

// People Index Page
router.get("/", (req, res) => {
  // Display a list of all people; it can be in an unordered list, or a table
  // Each of these people need to link to the single person page
  people
    .getAllPeople()
    .then(peopleList => {
      res.render("people/index", { people: peopleList });
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
