
var currId = 0;
var todoListEntries = {};

var makeToDo = function(title, task) {
    if (!title) throw "Must provide a title";
    if (!task) throw "Must provide a task";

    var newTask = { id: ++currId, title: title, task: task, done: false };

    todoListEntries[newTask.id] = newTask;
    return newTask;
};

var getToDo = function(id) {
    if (!todoListEntries[id]) throw "No such entry exists";
    return todoListEntries[id];
};

var finishToDo = function(id) {
    var entry = getToDo(id);
    entry.done = true;

    return entry;
};

var updateToDo = function(id, newTitle, newTask) {
    var entry = getToDo(id);
    if (newTitle) entry.title = newTitle;
    if (newTask) entry.task = newTask;

    return entry;
};

var getAll = function() {
    return Object.keys(todoListEntries).map(function(key) {
        return todoListEntries[key];
    });
};

var getFinished = function() {
    return getAll().filter(function(entry) {
        return entry.done;
    });
};

var getUnfinished = function() {
    return getAll().filter(function(entry) {
        return !entry.done;
    });
};

var exports = module.exports = {
    getToDo: getToDo,
    finishToDo: finishToDo,
    updateToDo: updateToDo,
    getAll: getAll,
    getFinished: getFinished,
    getUnfinished: getUnfinished,
    makeToDo: makeToDo
};

exports.makeToDo("Finish ToDo List", "You should finish this list");