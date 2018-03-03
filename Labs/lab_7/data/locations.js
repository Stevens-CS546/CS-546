let locationList = [
  {
    id: 1,
    name: "Texas de Brazil",
    location: "Albany, NY"
  },
  {
    id: 2,
    name: "The Capital Building",
    location: "Washington DC"
  },
  {
    id: 3,
    name: "The Fishing Hole",
    location: "Neverland"
  },
  {
    id: 4,
    name: "Freddy's Rib Joint",
    location: "Washington DC"
  },
  {
    id: 5,
    name: "The Riverfront",
    location: "Troy NY"
  }
];

let exportedMethods = {
  getAllLocations: () => {
    return Promise.resolve(locationList.slice(0));
  },
  getLocation: id => {
    if (id === undefined) return Promise.reject("No id provided");

    let location = locationList.filter(x => x.id === id).shift();
    if (!location) return Promise.reject("No location found");

    return Promise.resolve(location);
  }
};

module.exports = exportedMethods;
