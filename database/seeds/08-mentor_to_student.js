
exports.seed = function(knex) {
  return knex('mentor_to_student').insert([
    {mentor_id: 3, student_id: 5},
    {mentor_id: 3, student_id: 6},
    {mentor_id: 4, student_id: 7},
    {mentor_id: 4, student_id: 8},
    {mentor_id: 4, student_id: 9}
  ]);
};
