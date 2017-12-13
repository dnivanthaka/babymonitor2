const { spawn } = require('child_process');
//iw wlan0 link | grep SSID
//ifconfig wlan0 | grep -o 'inet addr:[0-9]*.[0-9]*.[0-9]*.[0-9]*'
function exec_simple_cmd(pcmd, args){
        self = this;

        const cmd = spawn(pcmd, args);

        cmd.on('error', (data)=>{
                console.log(`error: ${data}`);
        });

        cmd.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
           //stdout(data);
        });

        cmd.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });

        cmd.on('close', (code) => {
          console.log(`child process exited with code ${code}`);
        });
}

const { exec } = require('child_process');
exec('ifconfig eth0 | grep -o "inet addr:[0-9]*.[0-9]*.[0-9]*.[0-9]*"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});


var obj = {};

obj.exec = function(cb){
        cb();
        
}

//exec_simple_cmd("ifconfig", ['eth0', '|', 'grep', '-o', "'inet addr:[0-9]*.[0-9]*.[0-9]*.[0-9]*'"]);

//var test = new obj();
obj.exec(function(){
        console.log("Test");
});
