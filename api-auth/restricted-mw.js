//import jwt
const jwt = require('jsonwebtoken');

//import secret
const { jwtSecret } = require('../config/secrets.js');

//mw
module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "Invalid log in"})
      } else {
        req.decodedToken = decodedToken;
        next();
      }
    })
  } else {
    res.status(400).json({ message: "No log in provided" })
  }
}