
exports.seed = function(knex) {
  return knex('roles').insert([
    {name: 'admin'}, // 1
    {name: 'mentor'}, // 2
    {name: 'student'} // 3
  ]);
};
