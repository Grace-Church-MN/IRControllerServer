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
			if(message.id){
				console.log(exec('/usr/bin/irsend SEND_ONCE --device=/var/run/lirc/lircd' + message.id + 'Vizio KEY_POWER'));
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
