var express = require("express");
var router = express.Router();
var data = require("../data");
var events = data.events;
var people = data.people;
var locations = data.locations;

// Single Event Page
router.get("/:id", (req, res) => {
  // Find a event by the provided id,
  // then display its information
  // As well as listing the names of all the attendees that will be at this event
  // Each of these attendee names will need to link to their person page
  // You will also list the location of the event, said location's name, and a link to the location page

  // If a event is not found, display the 404 error page

  var singleEventObj = {
    id: null,
    title: null,
    startTime: null,
    description: null,
    attendees: [],
    location: null,
    locationName: null
  };
  var names = [];
  events
    .getEvent(parseInt(req.params.id))
    .then(eventObj => {
      var peoplePromises = eventObj.attendees.map(attendee =>
        people.getPerson(attendee)
      );

      Promise.all(peoplePromises)
        .then(arrayOfPeople => {
          console.log("got people");
          console.log(arrayOfPeople);
        })
        .catch(error => {
          console.error("error");
          console.log(error);
        });

      return Promise.all([eventObj, locations.getLocation(eventObj.location)])
        .then(values => {
          //console.log(values[0]);
          //console.log(values[1].length + " and the type is" + typeof(values[1]));

          singleEventObj.id = eventObj.id;
          singleEventObj.title = eventObj.title;
          singleEventObj.startTime = eventObj.startTime;
          singleEventObj.description = eventObj.description;
          singleEventObj.attendees = eventObj.attendees;
          singleEventObj.location = eventObj.location;
          singleEventObj.locationName = values[1].name;

          //res.render("events/singleEvent", { singleEvent:singleEventObj});
          return singleEventObj.attendees;
        })
        .then(attendees => {
          attendees.forEach(f => {
            people.getPerson(f).then(result => {
              names.push(result);
            });
          });
          return names;
        })
        .then(names => {
          //console.log(names);
          //console.log(singleEventObj);
          res.render("events/singleEvent", {
            singleEvent: singleEventObj,
            name: names
          });
        });
    })
    .catch(() => {
      res.status(404).send("Event Not Found");
    });
});

// Event Index Page
router.get("/", (req, res) => {
  // Display a list of all events; it can be in an unordered list, or a table
  // Each of these events need to link to the single event page
  events
    .getAllEvents()
    .then(eventsList => {
      res.render("events/index", { events: eventsList });
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
