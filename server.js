#!/usr/bin/env node

var app = require('./app');
var http = require('http');
var j5 = require('./services/j5');
var port = normalizePort(process.env.PORT || '1337');
app.set('port', port);

function _init() {

	var opts = {
		port: "/dev/cu.usbserial-A603R45N"
	};

	j5.init(opts, function (err, res) {
		j5.message("Test Message",1,0)
	});
}

var server = http.createServer(app);

server
	.listen(port)
	.on('error', function (err) {
		if (err.syscall !== 'listen') {
			throw err;
		}

		var bind = typeof port === 'string'
			? 'Pipe ' + port
			: 'Port ' + port;

		// handle specific listen errors with friendly messages
		switch (err.code) {
			case 'EACCES':
				console.error(bind + ' requires elevated privileges');
				process.exit(1);
				break;
			case 'EADDRINUSE':
				console.error(bind + ' is already in use');
				process.exit(1);
				break;
			default:
				throw err;
		}
	})
	.on('listening', function () {
		console.info('Server Web Access On Port ' + server.address().port);
		_init();
	});

function normalizePort(val) {
	var port = parseInt(val, 10);

	if (isNaN(port)) return val;
	if (port >= 0) return port;

	return false;
}
