const eventList = [
    {
        id: 0,
        attendees: [1, 2],
        title: "Dinner at Texas de Brazil",
        startTime: new Date("1/15/2016"),
        description: "Going out to dinner to a fancy restaurant",
        location: 1
    },
    {
        id: 1,
        attendees: [1, 2, 3, 4],
        title: "Gala",
        startTime: new Date("2/07/2016"),
        description: "Have to attend a gala for fundraising with other very important people",
        location: 2
    },
    {
        id: 2,
        attendees: [1, 3, 5],
        title: "Fishing Trip",
        startTime: new Date("3/29/2016"),
        description: "Going fishing!",
        location: 3
    },
    {
        id: 3,
        attendees: [1, 2, 4, 6],
        title: "End of Year Celebration",
        startTime: new Date("5/15/2016"),
        description: "Going out to dinner to a fancy restaurant, this time to celebrate end of school year",
        location: 1
    },
    {
        id: 4,
        attendees: [5, 6],
        title: "Firework Festival",
        startTime: new Date("7/4/2016"),
        description: "Let's go watch fireworks at the capital!",
        location: 4
    },
    {
        id: 5,
        attendees: [5, 1, 2],
        title: "End of Summer Party",
        startTime: new Date("1/15/2016"),
        description: "Let's throw a BBQ for the end of the summer",
        location: 5
    },
];

let exportedMethods = {
    getAllEvents: () => { return Promise.resolve(eventList.slice(0)); },
    getEvent: (id) => {
        if (id === undefined) return Promise.reject("No id provided");

        let event = eventList.filter(x => x.id === id).shift();
        if (!event) return Promise.reject("No event found")

        return Promise.resolve(event);
    },
    getEventsForAttendee: (attendeeId) => {
        if (attendeesId === undefined) return Promise.reject("No attendee id provided");

        return Promise.resolve(eventList.filter(x => x.attendees.indexOf(attendeeId) >= 0));
    }
}

module.exports = exportedMethods;