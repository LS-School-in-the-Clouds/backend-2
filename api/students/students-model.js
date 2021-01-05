const db = require('./../../database/dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('students');
}

function getById(id) {
  return db('students')
    .where('user_id', id)
    .first();
}

function insert(student) {
  return db('students')
    .insert(student)
}

function update(id, changes) {
  return db('students')
    .where('user_id', id)
    .update(changes);
}

function remove(id) {
  return db('students')
    .where('id', id)
    .del();
}
