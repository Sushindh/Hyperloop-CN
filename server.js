const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { spawn } = require('child_process');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 8080;

// Spawn the C server process
const cServer = spawn('./c_program/server'); // Ensure this path is correct

cServer.stdout.on('data', (data) => {
    console.log(`C Server Output: ${data}`);
});

cServer.stderr.on('data', (data) => {
    console.error(`C Server Error: ${data}`);
});

// Listen for client connections
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle incoming messages from clients
    socket.on('clientMessage', (message) => {
        console.log('Message from client:', message);
        // Send message to C server if needed
        // cServer.stdin.write(`${message}\n`);
        // For example, you can read the C server response and send it back
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
