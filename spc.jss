const net = require('net')
const SerialPort = require('serialport')
const client = new net.Socket()

const port = new SerialPort('COM3', function(err) {
	if(err) {
		return console.log('Error: ', err.message)
	}
	baudRate: 9600
	console.log('Connection established')
})

/*SerialPort.list().then(
	ports => ports.forEach(console.log),
	err => console.error(err)
)*/

/*client.connect(1337, '192.168.1.172', function() {
	console.log('Connected!')
	client.write('Hello, server. From, Client')
})

client.on('data', function(data) {
	console.log('Received: ' + data)
	client.destroy()
})

client.on('close', function() {
	console.log('Connection closed')
})*/