'use strict';

var crypto = require(__dirname + '/../lib/crypto');

function validateParams (req, res, next) {
  var msg = req.body.message;

  if (!msg) {
    res.status(400).send('Missing Param: Message');
    return undefined;
  } else {
    return next();
  }
}

function verify (req, res, next) {
  var msg = req.body.message;
  var ver = crypto.decrypt(msg);

  res.status(200).send(ver); // definitely seems wrong to just hand back the
  return next();             // decrypted string, but it's also a good way
}                            // to verify instad of handing back a boolean
                             // which can be fudged 8-)
module.exports = {
  validateParams: validateParams,
  logic: verify
}