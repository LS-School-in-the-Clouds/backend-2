const db = require('../../database/dbConfig');

module.exports = {
  insert,
  remove,
  getById,
  getByMentorId,
  getByStudentId
}

function insert(connection) {
  return db('mentor_to_student')
    .insert(connection)
}

function remove(id) {
  return db('mentor_to_student')
    .where('id', id)
    .del();
}

function getById(id) {
  return db('mentor_to_student')
    .where('id', id)
    .first();
}

function getByMentorId(id) {
  return db('mentor_to_student as ms')
    .join('students as s', 'ms.student_id', 's.user_id')
    .where('ms.mentor_id', id)
}

function getByStudentId(id) {
  return db('mentor_to_studnet as ms')
    .join('mentors as m', 'ms.mentor_id', 'm.user_id')
    .where('ms.student_id', id)
}