
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {first_name: 'Matthew', last_name: 'Serwer', interests: 'Synthesisers, Guitars', career_goals: 'To be a web developer', state: 'New York', country: 'USA', preferred_times: 'After 7pm EST', user_id: 5, 'timezone': 4},
        {first_name: 'Danny', last_name: 'McDude', interests: 'Science fiction, oregami', career_goals: 'Have my own company', state: 'Texas', country: 'USA', preferred_times: 'After 7pm EST', user_id: 6, 'timezone': 3},
        {first_name: 'Joe', last_name: 'McDude', interests: 'Space', career_goals: 'Have my own company', state: 'Texas', country: 'USA', preferred_times: 'After 7pm EST', user_id: 7, 'timezone': 3},
        {first_name: 'Kayla', last_name: 'McDude', interests: 'Computers', career_goals: 'Have my own company', state: 'Texas', country: 'USA', preferred_times: 'After 7pm EST', user_id: 8, 'timezone': 3},
        {first_name: 'Maggie', last_name: 'McDude', interests: 'making jam', career_goals: 'Have my own company', state: 'Texas', country: 'USA', preferred_times: 'After 7pm EST', user_id: 9, 'timezone': 3},
      ]);
    });
};
