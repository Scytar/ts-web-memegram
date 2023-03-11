const path = require("path");
const express = require("express");
const webSocket = require("ws");

const PORT = 3030;

const app = express();
const server = require('http').createServer(app);
const ws = new webSocket.Server({ server });

app.use(express.static(path.join(__dirname, "memegram-app", "build")));
app.use(express.static(path.join(__dirname, "memegram-app", "public")));

ws.on('connection', (socket) => {
  socket.send('Welcome to memegram websocket!');

  socket.on('message', (message) => {
    for (const client of ws.clients) {
      if (client !== socket && client.readyState === webSocket.OPEN) {
        client.send(`Client: ${message}`);
        console.log(`Client: ${message}`);
      }
    }
  });
});

app.get("/*", (req, res, next) => {
    console.log('Connection received');
    res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"))
})

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});