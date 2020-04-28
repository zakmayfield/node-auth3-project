
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: "ricky",
          password: "rickypass",
          department: "hr"
        },
        {
          username: "homer",
          password: "homerpass",
          department: "janitor"
        },
        {
          username: "bart",
          password: "bartpass",
          department: "sales"
        }
      ]);
    });
};
