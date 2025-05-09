const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const app = express();
const server = http.createServer(app); 
const io = socketIO(server); 
const port = 3000;

let page1 = { x: 0, y: 0, width: 100, height: 100 };
let page2 = { x: 0, y: 0, width: 100, height: 100 };

app.use(express.static(path.join(__dirname, 'views')));

app.get('/page1', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'page1.html'));
});

app.get('/page2', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'page2.html'));
});

io.on('connection', (socket) => {
    console.log('A user connected - ID:', socket.id); 
    socket.on('disconnect', () => {
        console.log('User disconnected - ID:', socket.id);
    });

    socket.on('win1update', (window1, sendid) => {
        page1 = window1;
        socket.broadcast.emit('getdata', page1);
    })

    socket.on('win2update', (window2, sendid) => {
        page2 = window2;
        socket.broadcast.emit('getdata', page2)
    })
});

server.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
