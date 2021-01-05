
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('roles').del()
    .then(function () {
      // Inserts seed entries
      return knex('roles').insert([
        {name: 'admin'}, // 1
        {name: 'mentor'}, // 2
        {name: 'student'} // 3
      ]);
    });
};