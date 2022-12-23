var http = require('http');
var express = require('express');
var app = express();

var server = http.createServer(app);
var io = require('socket.io')(server)

const { SerialPort } = require('serialport')
const port = new SerialPort({ path: 'COM3', baudRate: 9600 })

const { ReadlineParser } = require('serialport');
const parser = new ReadlineParser();

port.pipe(parser);

app.engine('ejs', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index')
});

// Switches the port into "flowing mode"
parser.on('data', function (data) {
  console.log('Data:', data.toString())
})

var buttonValue = 0;

io.on('connection', function(socket){
    console.log('Connection to client established');

    /*
    io.emit('clicked message', buttonValue);

    socket.on('clicked message', function(msg){
          buttonValue = 1 - buttonValue;
            io.emit('clicked message', buttonValue);
            console.log('Received message from client!',msg);
    });
    */


    socket.on('disconnect',function(){
        console.log('Server has disconnected');
    });
});

server.listen(3000, function() {
  console.log('Listening on port 3000...');
});
