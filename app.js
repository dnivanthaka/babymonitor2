//This is the main app file
// Author: D.N. Amerasinghe <nivanthaka@gmail.com>

var express = require('express');
var app = express();
var sockIo = require('socket.io');

var am2320 = require('./am2320.js');
var pir = require('./pir.js');

app.use(express.static('html'));
app.get('/', function(req, res){
    res.end();
});

var motionEvents = [];
const MAXEVENTS  = 64;
var motionEventTail = 0;
var motionEventHead = 0;

function pushEvent(newstate){
        if(newstate == 1){
            motionEventHead = (motionEventHead + 1) % MAXEVENTS;
            //motionEvents.push(new Date());
            motionEvents[motionEventHead] = new Date();
            //Append to file or google sheet
        } 
        console.log('Motion event ' + newstate);
}

function popEvent(){
    if(motionEventTail == motionEventHead){
        return null;
    }

    var ret = motionEvents[motionEventTail];
    motionEventTail = (motionEventTail + 1) % MAXEVENTS;
    return ret;
}



pir.setup(pushEvent);

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
