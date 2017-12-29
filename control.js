const { exec } = require('child_process');
/*exec('ifconfig wlan0 | grep -o "inet addr:[0-9]*.[0-9]*.[0-9]*.[0-9]*"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});*/


module.exports = {
	shutdown: function(){
		exec('sudo shutdown -h now', (error, stdout, stderr) => {
  			if (error) {
    				console.error(`exec error: ${error}`);
    				return;
  			}
  			console.log(`stdout: ${stdout}`);
  			console.log(`stderr: ${stderr}`);
			//return true;
		});

	},
	restart: function(){
		exec('sudo shutdown -r now', (error, stdout, stderr) => {
                        if (error) {
                                console.error(`exec error: ${error}`);
                        	return;
                	}
                	console.log(`stdout: ${stdout}`);
                	console.log(`stderr: ${stderr}`);
			//return true;
                });
	},
	restartService: function(){
		exec('sudo service uv4l_raspicam restart', (error, stdout, stderr) => {
			if (error) {
                                console.error(`exec error: ${error}`);
                        	return;
			}

			//return true;
		});
	}
};
