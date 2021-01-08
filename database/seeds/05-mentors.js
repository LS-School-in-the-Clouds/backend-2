
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('mentors').del()
    .then(function () {
      // Inserts seed entries
      return knex('mentors').insert([
        {first_name: 'Charlie', last_name: 'Murphy', interests: 'Rick James concerts, comedy, & storytelling', career: 'comedian', state: 'New York', country: 'USA', preferred_times: 'After 8pm Eastern', img_url: "https://unsplash.com/photos/pouEfzllYGU", user_id: 4, 'timezone': 4},
        {first_name: 'John', last_name: 'Smith', interests: 'Math, Making Pizza, Motorcross', career: 'Accountant', state: 'California', country: 'USA', preferred_times: '5-7pm PST', img_url: "https://unsplash.com/photos/pouEfzllYGU", user_id: 5, 'timezone': 1},
        {first_name: 'Laura', last_name: 'Smith', interests: 'Skydiving', career: 'Accountant', state: 'California', country: 'USA', preferred_times: '5-7pm PST', img_url: "https://unsplash.com/photos/pouEfzllYGU", user_id: 6, 'timezone': 1}
      ]);
    });
};
