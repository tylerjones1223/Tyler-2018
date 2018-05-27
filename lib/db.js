'use strict';
// schema creation and connection file
var mongoose = require('mongoose');
var config = require(__dirname + '/../config.js');

var userSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  publicKey: String,
  authenticated: Boolean
});

mongoose.model('users', userSchema);

mongoose.connect(config.db.url);

var db = mongoose.connection;

module.exports = db;