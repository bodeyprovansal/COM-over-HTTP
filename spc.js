const net = require('net')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const client = new net.Socket()

const STE_COM = 'COM1'
const DEV_SERVER = '192.168.1.188'
const PORTNUM = 1337

const sprl = SerialPort.parsers.Readline
const parser = new Readline({ delimiter: '\r\n' })


const port = new SerialPort(STE_COM, function(err) {
	if(err) {
		return console.log('Error: ', err.message)
	}
	baudRate: 9600
        client.write('\r')
	console.log('Connection established to port: ' + port.path)
})

port.open(function (err) {
	if(err) {
		return console.log('Error opening port: ', err.message)
	}
})

//port.pipe(parser)
//parser.on('data', console.log)

parser.on('data', function(data) {
  client.write(data)
})

/*SerialPort.list().then(
	ports => ports.forEach(console.log),
	err => console.error(err)
)*/

client.connect(PORTNUM, DEV_SERVER, function() {
	console.log('Client Connected!')
})

process.stdin.resume()

process.stdin.on('data', function(data){
	var clientData = data.toString().trim()
	
	client.write(data)
})

client.on('connect', function() {
	//var pipBuff = port.read()
	//console.log('Pippin Buffer: ' + pipBuff.toString())
})

client.on('data', function(data) {
	console.log(data.toString().trim())
	port.write(data.toString())
	//client.destroy()
})

client.on('close', function() {
	console.log('Connection closed')
})



/*const net = require('net')
const SerialPort = require('serialport')
const client = new net.Socket()

const sprl = SerialPort.parsers.Readline
const parser = new sprl()

const port = new SerialPort('COM4', function(err) {
	if(err) {
		return console.log('Error: ', err.message)
	}
	baudRate: 9600
	console.log('Connection established to port: ' + port.path)
})
port.open(function (err) {
	if(err) {
		return console.log('Error opening port: ', err.message)
	}
})

port.pipe(parser)
parser.on('data', console.log)

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
