'use strict';

var cluster = require('cluster');
var config = require(__dirname + '/config.js');
var numCPUs = require('os').cpus().length;
var api;

if (cluster.isMaster) {
  console.log('Master Process is online');
  for (var w = 0; w < numCPUs; w++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker) {
    console.log(`Worker Died: ${worker.process.pid}`);
    cluster.fork();
  });

  cluster.on('online', function (worker) {
    console.log(`New Worker Online: ${worker.process.pid}`);
  });
} else {
  api = require(__dirname + '/api');

  api.listen(config.server.port, function () {
    console.log(`Server accepting requests on port ${config.server.port}`);
  });
}