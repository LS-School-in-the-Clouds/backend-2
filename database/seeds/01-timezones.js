
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('timezones').del()
    .then(function () {
      // Inserts seed entries
      return knex('timezones').insert([
        {name: 'pacific'}, // 1
        {name: 'mountain'}, // 2
        {name: 'central'}, // 3
        {name: 'eastern'} // 4
      ]);
    });
};