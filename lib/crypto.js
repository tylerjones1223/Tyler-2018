'use strict';
// localized encryption and decryption
var crypto = require('crypto');
var ursa = require('ursa'); // makes encrypting and decrypting loads easier
var fs = require('fs');

function createHash (str) { // hash passwords because plain text is no fun
  var secH = crypto.createHash('sha256')
             .update(str)
             .digest('hex');

  return secH;
}

function signMessage (msg, pk) {
  var pkBuf = new Buffer(pk, 'hex'); // convert saved hex string to buffer
  var key = ursa.createPublicKey(pkBuf);
  var signed = key.encrypt(msg, 'utf8', 'base64');

  return signed;
}

function decrypt (msg) {
  var prK = fs.readFileSync(__dirname + '/../priv.pem');
  var key = ursa.createPrivateKey(prK);
  var msg = key.decrypt(msg, 'base64', 'utf8');

  return msg;
}

function createPrivateKey () {
  var key = ursa.generatePrivateKey();
  var priv = key.toPrivatePem();

  fs.writeFileSync('priv.pem', priv.toString());
}

function createPublicKey () {
  var key = ursa.createPrivateKey(fs.readFileSync(__dirname + '/../priv.pem'));
  var pub = key.toPublicPem().toString('hex');

  return pub;
}

module.exports = {
  createHash: createHash,
  signMessage: signMessage,
  decrypt: decrypt,
  createPublicKey: createPublicKey,
  createPrivateKey: createPrivateKey,
};