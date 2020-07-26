const express = require('express');
const socket = require('socket.io');
const app = express();
const PORT = 4000;

const server = app.listen(PORT, ()=> {
    console.log(`server listening on ${PORT}`);
});


app.use(express.static('public'));

const io = socket(server);

io.on('connection',(socket)=> {
    console.log("connection established");

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data)
    })

    socket.on('typing', function(data){
        socket.broadcast.emit('typing', data);
    });
})