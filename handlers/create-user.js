'use strict';

var crypto = require(__dirname + '/../lib/crypto');

function validateParams (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  if (!username) {
    res.status(400).send('Missing Param: Username');
    return undefined;
  }

  if (!password) {
    res.status(400).send('Missing Param: Password');
    return undefined;
  }

  return next();
}

function createUser (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  req.db.users.create({
    username: username,
    password: crypto.createHash(password),
    publicKey: crypto.createPublicKey(),
    authenticated: false // hacky default
  })
  .then(function (user) {
    res.status(201).send({
      username: user.username
    });
    return next();
  })
  .catch(function (err) {
    console.log(err);

    res.status(500).send(err);
    return undefined;
  })
}

module.exports = {
  validateParams: validateParams,
  logic: createUser
};