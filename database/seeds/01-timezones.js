
exports.seed = function(knex) {
  return knex('timezones').insert([
    {name: 'pacific'}, // 1
    {name: 'mountain'}, // 2
    {name: 'central'}, // 3
    {name: 'eastern'} // 4
  ]);
};
