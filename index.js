const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

(async () => {

        app.get('/', function(req, res){
                res.send('<h1>Office Controller Server</h1>');
        });
        http.listen(3000, function(){
                console.log('Listening on *:3000');
        });

        io.on('connection', function(socket){
                console.log('a user connected');
                //socket.emit('update', settings);
				socket.on('message', data => {
					console.log(data);
				});

                socket.on('disconnect', () => {
                        console.log('user disconnected');
                });
        });

})();
