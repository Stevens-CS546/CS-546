var express = require("express");
var router = express.Router();
var data = require("../data");
var locations = data.locations;
var events = data.events;

// Single Location Page
router.get("/:id", (req, res) => {
  // Find a location by the provided id,
  // then display its information
  // As well as listing all events that will be at this location
  // Each of these events need to link to the event page and show the event name
  // If a location is not found, display the 404 error page

  locations
    .getLocation(parseInt(req.params.id))
    .then(locationObj => {
      Promise.all([
        locationObj,
        events.getEventsForLocation(parseInt(locationObj.id))
      ]).then(results => {
        var localeObj = {
          id: null,
          name: null,
          location: null,
          events: []
        };
        localeObj.id = locationObj.id;
        localeObj.name = locationObj.name;
        localeObj.location = locationObj.location;
        localeObj.events = results[1];
        //console.log(results[1].length + " Array length");
        //console.log(peopleObj);
        res.render("locations/singleEvent", { location: localeObj });
      });
    })
    .catch(() => {
      res.status(404).send("Location Not Found");
    });
});

// Location Index Page
router.get("/", (req, res) => {
  // Display a list of all locations; it can be in an unordered list, or a table
  // Each of these locations need to link to the single location page
  locations
    .getAllLocations()
    .then(locationsList => {
      res.render("locations/index", { locations: locationsList });
    })
    .catch(e => {
      res.status(500).json({ error: e });
    });
});

module.exports = router;
