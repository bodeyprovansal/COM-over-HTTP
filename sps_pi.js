const net = require('net')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const port = new SerialPort('/dev/ttyUSB0', () => {
	baudRate: 9600
	console.log('Connection Made to device at: ' + port.path)
})

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)

const server = net.createServer(function(socket) {
  console.log('server: tcp server started')

  socket.on('data', function(data) {
    console.log('server: ' + data + ' from ' + socket.remoteAddress + ':'
	          + socket.remotePort)
    socket.write('server repeating: ' + data)
  })

  socket.on('close', function() {
    console.log('server: client closed connection')
  })
  
  socket.write('Echo server\r\n')
  socket.pipe(socket)
  socket.pipe(port)
})

server.listen(1337, '127.0.0.1')

//port.pipe(parser)
//parser.on('data', console.log)
port.write('\r')

