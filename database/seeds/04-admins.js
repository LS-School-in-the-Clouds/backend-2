
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {'school-district': 'Half Hollow Hills', 'school-name': 'West', state: 'New York', country: 'USA', 'user-id': 1},
        {'school-district': 'Half Hollow Hills', 'school-name': 'East', state: 'New York', country: 'USA', 'user-id': 2}
      ]);
    });
};
