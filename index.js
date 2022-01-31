const jayson = require('jayson');
const {PORT} = require('./config');
const { startMining, stopMining } = require('./mine');

// create server
const server = jayson.server({
    startMining: function(_, callback) {
        callback(null, 'success! - start mining');
        startMining();
    },
    stopMining: function(_, callback) {
        callback(null, 'success! - stopped mining');
        stopMining();
    }
});

server.http().listen(PORT);
