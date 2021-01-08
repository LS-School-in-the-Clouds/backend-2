
exports.seed = function(knex) {
  return knex('admin_to_mentor').insert([
    {admin_id: 1, mentor_id: 4},
    {admin_id: 2, mentor_id: 5},
    {admin_id: 3, mentor_id: 6},
    {admin_id: 3, mentor_id: 7}
  ]);
};
