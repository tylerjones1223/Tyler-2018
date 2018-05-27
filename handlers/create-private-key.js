'use strict';

var crypto = require(__dirname + '/../lib/crypto.js');

function createPrivateKey (req, res, next) {
  crypto.createPrivateKey();
  
  res.status(201).send('Private Key Created');
}

module.exports = {
  logic: createPrivateKey
};