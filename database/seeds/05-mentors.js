
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mentors').del()
    .then(function () {
      // Inserts seed entries
      return knex('mentors').insert([
        {first_name: 'Charlie', last_name: 'Murphy', interests: 'Rick James concerts, comedy, & storytelling', career: 'comedian', state: 'New York', country: 'USA', preferred_times: 'After 8pm Eastern', user_id: 3, 'timezone': 4},
        {first_name: 'John', last_name: 'Smith', interests: 'Math, Making Pizza, Motorcross', career: 'Accountant', state: 'California', country: 'USA', preferred_times: '5-7pm PST', user_id: 4, 'timezone': 1}
      ]);
    });
};
