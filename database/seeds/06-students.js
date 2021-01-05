
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {first_name: 'Matthew', last_name: 'Serwer', interests: 'Synthesisers, Guitars', career_goals: 'To be a web developer', state: 'New York', country: 'USA', preferred_times: 'After 7pm EST', user_id: 5, 'timezone': 4},
        {first_name: 'Danny', last_name: 'McDude', interests: 'Science fiction, oregami', career_goals: 'Have my own company', state: 'Texas', country: 'USA', preferred_times: 'After 7pm EST', user_id: 5, 'timezone': 3},
      ]);
    });
};
