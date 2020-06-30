const SerialPort = require('serialport')
const port = new SerialPort('/dev/ttyUSB0', {
	baudRate: 9600
})

port.write('up', function(err) {
  if(err) {
    return console.log('Error on write: ', err.message)
  }
  console.log('message written')
})
  
port.on('error', function(err) {
  console.log('Error from device: ', err.message)
})

port.on('readable', function() {
  console.log('Data: ', port.read())
})
port.on('data', function(data) {
  console.log('Data:', data)
})

const lineStream = port.pipe(new Readline())

port.write('stop')
port.write('version')
