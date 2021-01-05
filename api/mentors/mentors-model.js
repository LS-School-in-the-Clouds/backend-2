const db = require('./../../database/dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('mentors');
}

function getById(id) {
  return db('mentors')
    .where('user_id', id)
    .first();
}

function insert(mentor) {
  return db('mentors')
    .insert(mentor)
}

function update(id, changes) {
  return db('mentors')
    .where('user_id', id)
    .update(changes);
}

function remove(id) {
  return db('mentors')
    .where('id', id)
    .del();
}
