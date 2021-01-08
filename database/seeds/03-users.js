
exports.seed = function(knex) {
  return knex('users').insert([
    {username: 'Admin1', password: 'password', email: 'fdsa@mail.com', role: 1}, // 1
    {username: 'Admin2', password: 'password', email: 'yes@mail2.com', role: 1}, // 2
    {username: 'Admin3', password: 'password', email: 'subbliss@mail3.com', role: 1}, // 3
    {username: 'Mentor1', password: 'password', email: 'mentone@gmail.com', role: 2}, // 4
    {username: 'Mentor2', password: 'password', email: 'elvisisking@gmail.com', role: 2}, // 5
    {username: 'Mentor3', password: 'password', email: 'jackadullboy@gmail.com', role: 2}, // 6
    {username: 'Mentor4', password: 'password', email: 'runforestrun@gmail.com', role: 2}, // 6
    {username: 'Student1', password: 'password', email: 'wonderboy@yahoo.com', role: 3}, // 7
    {username: 'Student2', password: 'password', email: 'test1@mail.com', role: 3}, // 8
    {username: 'Student3', password: 'password', email: 'test2@mail.com', role: 3}, // 9
    {username: 'Student4', password: 'password', email: 'test3@mail.com', role: 3}, // 10
    {username: 'Student5', password: 'password', email: 'test4@mail.com', role: 3}, // 11
  ]);
};
