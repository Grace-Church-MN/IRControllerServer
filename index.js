const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { exec } = require('child_process');
const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

(async () => {

	app.get('/', function(req, res){
		res.send('<h1>IR Controller Server</h1>');
	});
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('message', async function (message) {
			for (let item of message) {
				if(item.id){
					console.log(item.id);
					if(item.id == "0"){
						console.log('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd ' + item.type + ' ' + item.key);
						exec('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd ' + item.type + ' ' + item.key);
						await sleep(175);
					} else {
						console.log('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd-' + item.id + ' ' + item.type + ' ' + item.key);
						exec('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd-' + item.id + ' ' + item.type + ' ' + item.key);
						await sleep(175);
					}
				}
			}
		});


		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	http.listen(3000, function(){
		console.log('Listening on *:3000');
	});

})();
