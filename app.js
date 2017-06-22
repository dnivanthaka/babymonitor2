//This is the main app file
// Author: D.N. Amerasinghe <nivanthaka@gmail.com>

var express = require('express');
var app = express();
var sockIo = require('socket.io');


app.use(express.static('html'));
app.get('/', function(req, res){
    res.end();
});


var server = app.listen(8080, '0.0.0.0', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening on http://%s:%s", host, port);
});

var listener = sockIo.listen(server);
listener.on('connection', function(socket){
    setInterval(function(){
        socket.emit("Test", "123");
    }, 2000);
});
