
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      // Inserts seed entries
      return knex('admins').insert([
        {school_district: 'Half Hollow Hills', school_name: 'West', state: 'New York', country: 'USA', img_url: "https://unsplash.com/photos/pouEfzllYGU", user_id: 1}, // 1
        {school_district: 'Half Hollow Hills', school_name: 'East', state: 'New York', country: 'USA', img_url: "https://unsplash.com/photos/pouEfzllYGU", user_id: 2}, // 2
        {school_district: 'Suburban Bliss', school_name: 'North', state: 'Colorado', country: 'USA', img_url: "https://unsplash.com/photos/pouEfzllYGU", user_id: 3} // 3
      ]);
    });
};
