const db = require('./../../database/dbConfig');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return db('admins');
}

function getById(id) {
  return db('admins')
    .where('user_id', id)
    .first();
}

function insert(admin) {
  return db('admins')
    .insert(admin)
}

function update(id, changes) {
  return db('admins')
    .where('user_id', id)
    .update(changes);
}

function remove(id) {
  return db('admins')
    .where('id', id)
    .del();
}
