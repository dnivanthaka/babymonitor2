const { spawn } = require('child_process');
//iw wlan0 link | grep SSID
//ifconfig wlan0 | grep -o 'inet addr:[0-9]*.[0-9]*.[0-9]*.[0-9]*'
function exec_simple_cmd(pcmd, error, stdout, stderr){
        self = this;

        const cmd = spawn(pcmd, []);

        cmd.on('error', (data)=>{
                console.log(`error: ${data}`);
        });

        cmd.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
           stdout(data);
        });

        cmd.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        cmd.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
}

var obj = {};

obj.exec = function(cb){
        cb();
        
}

exec_simple_cmd("lsx", function(e){console.log("Error "+e)},function(e){console.log("Stdout "+e)} , function(e){console.log("Stderr "+e)});

//var test = new obj();
obj.exec(function(){
        console.log("Test");
});
