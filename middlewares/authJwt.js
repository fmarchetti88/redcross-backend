const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      message: 'Missing token!'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    req.userId = decoded.id;
    req.committeeId = decoded.committeeId;
    next();
  });
};

const authJwt = {
  verifyToken
};
module.exports = authJwt;
