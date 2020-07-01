const net = require('net')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const HOST = '127.0.1.1'
const PORTNUM = 1337

const port = new SerialPort('/dev/ttyUSB0', () => {
	baudRate: 9600
	console.log('Connection Made to device at: ' + port.path)
})

port.on('open', console.log)

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))
parser.on('data', console.log)

const server = net.createServer(function(socket) {
  console.log('server: tcp server started')

  socket.on('data', function(data) {
    //Here 'data' is received from client
    console.log('server: ' + data + ' from ' + socket.remoteAddress + ':'
	          + socket.remotePort)
    //Here 'data' is being sent back to client
    socket.write('server repeating: ' + data)
    //port.write('\r')
    port.write(data.toString())
    port.write('\r')
  })

  socket.on('close', function() {
    console.log('server: client closed connection')
  })
  
  //socket.write('Echo server\r\n')
  //Client Receives info back from port/device
  //socket.pipe(socket)
  //Info from device back to server
  ///socket.pipe(port)
  parser.on('data', function(data) {
    console.log('dataBackToClient: ')
    socket.write(data)
  })
})

server.listen(PORTNUM, '192.168.1.188')

//port.pipe(parser)
//parser.on('data', console.log)
//port.write('\r')

