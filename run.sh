#!/bin/bash

export PATH=$PATH:/usr/local/bin/node-v6.11.0-linux-armv6l/bin
cd /home/pi/projects/babymonitor2
node ./app.js &
#sleep 5
#iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
