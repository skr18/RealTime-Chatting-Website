// Node server which will handle socket io connections

const io = require('socket.io')(8000,{
    cors:{
        origin:'*',
    }
});

const users = {};

io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', mynames =>{ 
        users[socket.id] = mynames;
        socket.broadcast.emit('user-joined', mynames);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    // // If someone leaves the chat, let others know 
    socket.on('disconnect', () =>{
        socket.broadcast.emit('left_chat', users[socket.id]);
        delete users[socket.id];
    });
})