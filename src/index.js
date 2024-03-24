const express = require('express');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = require('socket.io')(server, {cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    transports: ['websocket', 'polling'],
    credentials: true
},
allowEIO3: true
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle custom events
  socket.on('playerMove', (data) => {
    console.log('message', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
