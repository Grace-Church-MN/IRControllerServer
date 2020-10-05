const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

(async () => {

        app.get('/', function(req, res){
                res.send('<h1>Office Controller Server</h1>');
        });
        io.on('connection', function(socket){
                console.log('a user connected');
				socket.on('message', () => {
					console.log("message");
				});
				socket.on('new', () => {
					console.log("new");
				});

                socket.on('disconnect', () => {
                        console.log('user disconnected');
                });
        });
		http.listen(3000, function(){
                console.log('Listening on *:3000');
        });

})();
