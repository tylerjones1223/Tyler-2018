'use strict';
// gathers environment variables and formats url for db
var crypto = require(__dirname + '/lib/crypto.js');

module.exports = {
  server: {
    port: 4434 // makes life easy for tests
  },
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    url: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  }
};