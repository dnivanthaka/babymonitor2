var sysfs_directory = '/sys/bus/i2c/devices/1-005c';
var temperature_file = 'temp1_input';
var humidity_file    = 'humidity1_input';

var fs = require('fs');
var buf = new Buffer(16);
var temperature = 0;
var humidity    = 0;

function readValue(filename){
var value = 0;

    var fp = fs.openSync(sysfs_directory + '/' + filename, 'r');
    value = fs.readFileSync(fp);

    return Number(value.toString());
}

module.exports = {
    readValues: function(){
        //fs.access(sysfs_directory, fs.constants.F_OK, function(err){
        //if(err)
            //return;

        var fp = fs.statSync(sysfs_directory);
        if(fp != null && fp.isDirectory()){
            //We have a valid directory
            temperature = readValue(temperature_file) / 10;
            humidity    = readValue(humidity_file) / 10;

            output = {
                temp:temperature,
                humid:humidity
            };

            //console.log(JSON.stringify(output));
            return JSON.stringify(output);
        }
        //});
    }
}
