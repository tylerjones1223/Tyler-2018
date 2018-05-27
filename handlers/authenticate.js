'use strict';

var config = require(__dirname + '/../config.js');
var createHash = require(__dirname + '/../lib/crypto.js').createHash;

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

function findUser (req, res, next) {
  req.db.users.findOne({
    username: req.body.username,
    password: createHash(req.body.password) // it would be a good idead to hash this on
  })                                        // entry because we don't want to hand plain
  .then(function (user) {                   // text passwords around
    if (!user) {
      res.status(400).send('Invalid User');
      return undefined;
    }

    return next();
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).send(err);
    return undefined;
  })
}

function authenticate (req, res, next) {
  req.db.users.update({
    username: req.body.username
  }, {
    authenticated: true
  }) // hacky authentication
  .then(function () {
    res.status(200).send('Authenticated');
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
  findUser: findUser,
  logic: authenticate
};