const db = require('../../database/dbConfig');

module.exports = {
    insertTasks,
    findTasks,
    updateTasks,
    deleteTasks,
    findById,

};

function insertTasks(tasks) {
    return db('tasks')
    .insert(tasks)
}

function findTasks(id) {
    return db('tasks', id)

}

function updateTasks(id, changes) {
    return db('tasks')
    .where({ id })
    .update(changes);
}

function deleteTasks(id) {
    return db('tasks')
        .where('id', id)
        .del();
}

function findById(id) {
    return db('tasks')
    .where('id', id)
    .first();
}
