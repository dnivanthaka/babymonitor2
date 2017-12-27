const rpio = require('rpio');

rpio.init({mapping: 'physical'});

const HBPIN = 11;
var state = 0;
module.exports = {
        setup: function(cb_poll){
                rpio.open(HBPIN, rpio.OUTPUT, rpio.LOW);
        },
        toggle(){
            if(state === 1){
                rpio.write(HBPIN, rpio.HIGH);
            }else{
                rpio.write(HBPIN, rpio.LOW);
            }

            state = state ^ 1;
        },
        getState(){
            return state;
        },
        cleanup: function(){
                rpio.close(HBPIN);
        }
}
//setupGPIO('11', 'out', function(self, err){console.log('Error: '+err);}, function(self){console.log('Success: ');});
