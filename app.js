//This is the main app file
// Author: D.N. Amerasinghe <nivanthaka@gmail.com>

var express = require('express');
var app = express();
var sockIo = require('socket.io');

var am2320 = require('./am2320.js');
var pir = require('./pir.js');

var motion = {
        this.state = 0;
};

motion.update = function(newstate){
        this.state = newstate;
        console.log('Motion event ' + this.state);
}


app.use(express.static('html'));
app.get('/', function(req, res){
    res.end();
});

pir.setup(motion.update);

// AM2320 Data as json object
var am2320Data = null;
am2320Data = JSON.parse(am2320.readValues());

setInterval(function(){
    am2320Data = JSON.parse(am2320.readValues());
}, 60000);


var server = app.listen(8080, '0.0.0.0', function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Server listening on http://%s:%s", host, port);
});

var listener = sockIo.listen(server);
listener.on('connection', function(socket){
    setInterval(function(){
        socket.emit("envData", am2320Data);
    }, 2000);
});
