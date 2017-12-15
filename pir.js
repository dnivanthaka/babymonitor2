//const fs = require('fs');
var rpio = require('rpio');

rpio.init({mapping: 'physical'});

//const PIRPIN = 12;
const PIRPIN = 13
/*const gpioSysFs = "/sys/class/gpio/";

//Settingup GPIO
function setupGPIO(pin, dir, cb_onerror, cb_onsuccess){    
        var self = this;        

        //Check if already exported
        if(!fs.existsSync(gpioSysFs + "gpio" + pin + "/direction")){
                fs.writeFile(gpioSysFs + "export", pin, (err) => {
                        if(err) {
                                cb_onerror(self, err);
                                return;
                        }
                         fs.writeFileSync(gpioSysFs + "gpio" + pin + "/direction", dir);
                        cb_onsuccess(self);
                });
               
        }else{
                //Already exported
                fs.readFile(gpioSysFs + "gpio" + pin + "/direction", (err, data) => {
                        if(err) {
                                cb_onerror(self, err);
                                return;
                        }
                        
                        if(data !== dir){
                                console.log('Already exported as different pin direction');
                                return;
                        }
                        
                });
        }
}*/

/*function pollcb(){
        var state = rpio.read(PIRPIN);
        
        console.log(state);
}*/
module.exports = {
        setup: function(cb_poll){
                rpio.open(PIRPIN, rpio.INPUT, rpio.PULL_UP);
                rpio.poll(PIRPIN,  function(){
                        var state = rpio.read(PIRPIN);
                        cb_poll(state);
                });
        },
        cleanup: function(){
                rpio.close(PIRPIN);
        }
}
//setupGPIO('11', 'out', function(self, err){console.log('Error: '+err);}, function(self){console.log('Success: ');});
