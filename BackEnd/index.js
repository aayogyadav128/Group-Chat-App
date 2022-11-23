const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app)
const io = require('socket.io')(http,{cors:{origin:'*'}});


http.listen(8000, ()=>{
    console.log('server started');
    const users = {}
    io.on('connection',socket=>{
        socket.on('user-joined', name=>{
            console.log(name + " Joined the Chat")
            users[socket.id]=name;
            socket.broadcast.emit('user-joined',name);
        });
        socket.on('send',data=>{
            socket.broadcast.emit('receive',{msg: data, name: users[socket.id]})
        });
        socket.on('disconnect',message=>{
            socket.broadcast.emit('left', users[socket.id]);
            delete users[socket.id];
        })
    })

})




