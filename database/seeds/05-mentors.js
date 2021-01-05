
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mentors').del()
    .then(function () {
      // Inserts seed entries
      return knex('mentors').insert([
        {'first-name': 'Charlie', 'last-name': 'Murphy', interests: 'Rick James concerts, comedy, & storytelling', career: 'comedian', state: 'New York', country: 'USA', 'preferred-times': 'After 8pm Eastern', 'user-id': 3, 'timezone': 4},
        {'first-name': 'John', 'last-name': 'Smith', interests: 'Math, Making Pizza, Motorcross', career: 'Accountant', state: 'California', country: 'USA', 'preferred-times': '5-7pm PST', 'user-id': 4, 'timezone': 1}
      ]);
    });
};
