const SerialPort = require('serialport')
const net = require('net')
const fs = require('fs')
const readline = require('readline')
const sprl = SerialPort.parsers.Readline
const parser = new sprl()

/*var VirtualSerialPort = require('tcp-serial').SerialPort;


var sp = new VirtualSerialPort({
	host: 'localhost',
	type: 'udp4',
	port:5556
})



SerialPort.list().then(
	ports => ports.forEach(console.log),
	err => console.error(err)
)*/
//COM4 - 'USB\\VID_10C4&PID_EA60\\5&350590A7&0&1'
const port = new SerialPort('COM4', function(err) {
	if(err) {
		return console.log('Error: ', err.message)
	}
	baudRate: 9600
	console.log('Connection established to port: ' + port.path)
})

port.write('\r')

/*port.open(function (err) {
	if(err) {
		return console.log('Error opening port: ', err.message)
	}
})*/

const server = net.createServer(function(socket) {
	console.log('server: tcp server started')
	
	socket.on('data', function(data) {
		console.log('server: ' + data + ' from ' + socket.remoteAddress + ':' + socket.remotePort)
		socket.write('server repeating: ' + data)
	})
	
	socket.on('close', function() {
		console.log('server: client closed connection')
	})
	
	socket.write('Echo server\r\n');
	socket.pipe(socket);
	socket.pipe(port);
})

server.listen(1337, '192.168.1.172')
//server.socket.pipe(port);
port.pipe(parser)
parser.on('data', console.log)
port.write('\r')
port.write('IIIIIIIIIIIIIIIIIIIIIIIIIIII\r')



