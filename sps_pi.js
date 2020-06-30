const net = require('net')
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')

const port = new SerialPort('/dev/ttyUSB0', () => {
	baudRate: 9600
	console.log('Connection Made to device at: ' + port.path)
})

const parser = port.pipe(new Readline({ delimiter: '\n' }))
parser.on('data', console.log)

const server = net.createServer(function(socket) {
  console.log('server: tcp server started')

  socket.on('data', function(data) {
    //Here 'data' is received from client
    console.log('server: ' + data + ' from ' + socket.remoteAddress + ':'
	          + socket.remotePort)
    //Here 'data' is being sent back to client
    socket.write('server repeating: ' + data)
  })

  socket.on('close', function() {
    console.log('server: client closed connection')
  })
  
  //socket.write('Echo server\r\n')
  //Client Receives info back from port/device
  socket.pipe(socket)
  //Info from device back to server
  socket.pipe(port)
  parser.on('data', function(data) {
    socket.write(data)
  })
})

server.listen(1337, '10.10.1.179')

//port.pipe(parser)
//parser.on('data', console.log)
port.write('\r')

