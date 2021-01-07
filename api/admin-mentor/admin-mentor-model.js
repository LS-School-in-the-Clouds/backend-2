const db = require('../../database/dbConfig');

module.exports = {
    insert,
    remove,
    getById,
    getByAdminId,
    getByMentorId
  }

function insert(connection) {
    return db('admin_to_mentor')
        .insert(connection)
}

function remove(id) {
    return db('admin_to_mentor')
        .where('id', id)
        .del();
}

function getById(id) {
    return db('admin_to_mentor')
        .where('id', id)
        .first();
}

function getByAdminId(id) {
    return db('admin_to_mentor as am')
        .join('mentors as m', 'am.mentor_id', 'm.user_id')
        .where('am.admin_id', id)
}

function getByMentorId(id){
    return db('admin_to_mentor as am')
        .join('admins as a', 'am.admin_id', 'a.user_id')
        .where('am.mentor_id', id)
}
