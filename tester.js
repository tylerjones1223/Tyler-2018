'use strict';

var request = require('request');

function tester () {
  var route = process.argv[2];
  var params;
  var method = 'POST';

  switch (route) {
    case '/createUser':
      params = {
        username: process.argv[3],
        password: process.argv[4]
      };
      break;

    case '/authenticate':
      params = {
        username: process.argv[3],
        password: process.argv[4]
      };
      break;

    case '/createPrivateKey':
      method = 'GET';
      break;

    case '/addPublicKey':
      params = {
        username: process.argv[3]
      };
      break;

    case '/signMessage':
      params = {
        username: process.argv[3],
        message: process.argv[4].split(',').join(' ') // because argv
      };
      break;

    case '/verify':
      params = {
        message: process.argv[3].split(',').join(' ') // because argv
      };
      break;
  }

  var reqOpts = {
    uri: `http://localhost:4434${route}`,
    method: method,
    headers: {
        'Content-Type': 'application/json'
    },
};

  if (method === 'POST') {
    reqOpts.json = params;
  }

  request(reqOpts, function(error, response, body){
    console.log(response.statusCode);
    console.log(body);
  });
}

module.exports = tester();