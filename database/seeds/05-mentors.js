
exports.seed = function(knex) {
  return knex('mentors').insert([
    {first_name: 'Charlie', last_name: 'Murphy', interests: 'Rick James concerts, comedy, & storytelling', career: 'comedian', state: 'New York', country: 'USA', preferred_times: 'After 8pm Eastern', user_id: 4, 'timezone': 4},
    {first_name: 'John', last_name: 'Smith', interests: 'Math, Making Pizza, Motorcross', career: 'Accountant', state: 'California', country: 'USA', preferred_times: '5-7pm PST', user_id: 5, 'timezone': 1},
    {first_name: 'Laura', last_name: 'Smith', interests: 'Skydiving', career: 'Accountant', state: 'California', country: 'USA', preferred_times: '5-7pm PST', user_id: 6, 'timezone': 1},
    {first_name: 'Jenny', last_name: 'Gump', interests: 'Running', career: 'Shrimp boat captain', state: 'Louisiana', country: 'USA', preferred_times: '1-3pm CST', user_id: 7, 'timezone': 3}
  ]);
};
