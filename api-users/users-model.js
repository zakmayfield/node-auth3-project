const db = require('../data/dbConfig.js');

module.exports = {
  addUser,
  findUsers,
  findUserBy,
  findUserById,
}

function findUsers() {
  return db('users')
}

function addUser(user) {
  return db('users')
    .insert(user, "id")
}

function findUserBy(filter) {
  return db('users')
    .select('username', 'password', 'department')
    .where(filter);
}

function findUserById (id) {
  return db('users')
    .select('id', 'username', 'department')
    .where({ id })
    .first();
}