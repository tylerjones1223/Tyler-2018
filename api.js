'use strict';

var express = require('express');
var app = express();

var handlers = require(__dirname + '/handlers');
var db = require(__dirname + '/lib/db.js');

app.use(express.json());

app.use(function trafficLogger (req, res, next) {
  // to make sure you aren't making requests into a black cyber hole
  console.log('HTTP Request');
  res.once('finish', function resLogger () {
    console.log(`HTTP Response ${res.statusCode}`);
  });
  next();
});

app.use(function setupScope (req, res, next) {
  req.db = db.models; // connect db to req object for easy access
  req.$scope = {};

  return next();
});

app.post('/authenticate',     handlers.authenticate.validateParams,
                              handlers.authenticate.findUser,
                              handlers.authenticate.logic);

app.post('/addPublicKey',     handlers.addNewPublicKey.checkUserAuthority,
                              handlers.addNewPublicKey.logic);

app.get('/createPrivateKey',  handlers.createPrivateKey.logic);

app.post('/createUser',       handlers.createUser.validateParams,
                              handlers.createUser.logic);

app.post('/signMessage',      handlers.signMessage.addUserToScope,
                              handlers.signMessage.logic);

app.post('/verify',           handlers.verify.validateParams,
                              handlers.verify.logic);


module.exports = app;