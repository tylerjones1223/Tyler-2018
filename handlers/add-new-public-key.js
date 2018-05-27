'use strict';

var createPublicKey = require(__dirname + '/../lib/crypto.js').createPublicKey;

function checkUserAuthority (req, res, next) {
  req.db.users.findOne({
    username: req.body.username
  })
  .then(function (user) {
    if (!user.authenticated) { // not just anyone should add public keys
      res.status(401).send('Unauthenticated');
      return undefined;
    }

    return next();
  })
  .catch(function (err) {
    console.log(err, 'addPublicKey Error');
    res.status(500).send(err);
  });
}

function addNewPublicKey (req, res, next) {
  req.db.users.update({
    username: req.body.username
  }, {
    publicKey: createPublicKey()
  })
  .then(function (pk) {
    res.status(200).send('Public Key Added');
    return next();
  })
  .catch(function (err) {
    console.log(err, 'addPublicKey Error');
    res.status(500).send(err);
  });
}

module.exports = {
  checkUserAuthority: checkUserAuthority,
  logic: addNewPublicKey
}