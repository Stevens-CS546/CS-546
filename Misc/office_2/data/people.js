var personList = [
  {
    id: 1,
    name: "Phil"
  },
  {
    id: 2,
    name: "Bren"
  },
  {
    id: 3,
    name: "Francis Underwood"
  },
  {
    id: 4,
    name: "Claire Underwood"
  },
  {
    id: 5,
    name: "Ricky Underwood"
  },
  {
    id: 6,
    name: "Leo Boykewich"
  }
];

var exportedMethods = {
  getAllPeople: () => {
    return Promise.resolve(personList.slice(0));
  },
  getPerson: id => {
    //console.log(id + " is the id value and the id type is "+typeof(id));
    if (id === undefined) return Promise.reject("No id provided");

    var person = personList.filter(x => x.id === id).shift();
    if (!person) return Promise.reject("No person found");

    return Promise.resolve(person);
  }
};

module.exports = exportedMethods;
