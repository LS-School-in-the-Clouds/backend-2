
exports.seed = function(knex) {
  return knex('tasks').insert([
    {description: "Learn how to breakdance, and do it well.", type: "mentor", date: "01/18/21", assigned_by: 1, assigned_to: 3},
    {description: "Dance the magic dance.", type: "mentor", date: "01/18/21", assigned_by: 1, assigned_to: 3},
    {description: "Just do it!", type: "mentor", date: "01/18/21", assigned_by: 1, assigned_to: 3},
  ]);
};
