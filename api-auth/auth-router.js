//imports
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

//db model
const Users = require('../api-users/users-model.js');

//routes
// /register a user
router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.addUser(user)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "error on the server" })
    })
})

// /login a user
router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findUserBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome, ${user.username}!`,
          employee: user,
          token,
        })
      } else {
        res.status(401).json({ error: "Invalid Log In" })
      }
    })
    .catch(({ name, message, stack }) => {
      res.status(500).json({ name, message, stack })
    })
})

//generating a token
function generateToken(user) {
  const payload = {
    username: user.username,
    department: user.department
  };
  
  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, jwtSecret, options);
}

//export router
module.exports = router;