'use strict';

var crypto = require(__dirname + '/../lib/crypto');

function addUserToScope (req, res, next) {
  var username = req.body.username;

  req.db.users.findOne({
    username: username
  })
  .then(function (user) {
    if (!user) {
      res.status(400).send('Invalid Username');
      return undefined;
    }

    req.$scope.publicKey = user.publicKey;
    return next();
  })
  .catch(function (err) {
    console.log(err);
    res.status(500).send(err);
    return undefined;
  });
}

function signMessage (req, res, next) {
  var message = req.body.message;
  var pk = req.$scope.publicKey;

  var signedMessage = crypto.signMessage(message, pk);

  res.status(200).send(signedMessage);
  return next();
}

module.exports = {
  addUserToScope: addUserToScope,
  logic: signMessage
};