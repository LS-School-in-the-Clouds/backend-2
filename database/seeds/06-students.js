
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {'first-name': 'Matthew', 'last-name': 'Serwer', interests: 'Synthesisers, Guitars', 'career-goals': 'To be a web developer', state: 'New York', country: 'USA', 'preferred-times': 'After 7pm EST', 'user-id': 5, 'timezone': 4},
        {'first-name': 'Danny', 'last-name': 'McDude', interests: 'Science fiction, oregami', 'career-goals': 'Have my own company', state: 'Texas', country: 'USA', 'preferred-times': 'After 7pm EST', 'user-id': 5, 'timezone': 3},
      ]);
    });
};
