
//imports
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//route imports
const authRouter = require('../api-auth/auth-router.js');
const userRouter = require('../api-users/users-router.js');

//restricted middleware
const restricted = require('../api-auth/restricted-mw.js');

//declare server
const server = express();

//global middleware
server.use(helmet());
server.use(express.json());
server.use(cors());

//routes
server.use('/api/auth', authRouter);
server.use('/api/users', restricted, checkDepartment('hr'), userRouter);

//basic api indicating server is working
server.get('/api', (req, res) => {
  res.send('server is on');
})

//checking the authorization of a user
function checkDepartment(role) {
  return (req, res, next) => {
    if (
      req.decodedToken &&
      req.decodedToken.department &&
      req.decodedToken.department.toLowerCase() === role
    ) {
      next()
    } else {
      res.status(403).json({ message: "You need to be an HR rep to view this info" })
    }
  }
}

//export server
module.exports = server;