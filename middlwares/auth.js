/* eslint-disable import/no-extraneous-dependencies */
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let playload;

  try {
    playload = jwt.verify(token, 'SECRET');
  } catch (err) {
    next(err);
  }
  req.user = playload;
  next();
};
module.exports = auth;
