const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { exec } = require('child_process');

(async () => {

	app.get('/', function(req, res){
		res.send('<h1>IR Controller Server</h1>');
	});
	io.on('connection', function(socket){
		console.log('a user connected');
		socket.on('message', function (message) {
			message.forEach((item, i) => {
				if(item.id){
					console.log(item.id);
					if(item.id == "0"){
						console.log('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd ' + item.type + ' ' + item.key);
						exec('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd ' + item.type + ' ' + item.key);
					} else {
						console.log('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd-' + item.id + ' ' + item.type + ' ' + item.key);
						exec('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd-' + item.id + ' ' + item.type + ' ' + item.key);
					}
				}
			});
		});

		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	http.listen(3000, function(){
		console.log('Listening on *:3000');
	});

})();
