//import router from express
const router = require('express').Router();

//import our data model
const Users = require('./users-model.js');

//routes
// GET list of users
router.get('/', (req, res) => {
  Users.findUsers()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
    })
})

// GET user by id
router.get('/:id', (req, res) => {
  Users.findUserById(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: "server error" }));
})

//export router
module.exports = router