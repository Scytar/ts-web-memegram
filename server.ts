const path = require("path");
const express = require("express");
const webSocket = require("ws");

const PORT = 3030;

const app = express();
const server = require('http').createServer(app);
const ws = new webSocket.Server({ server });

//Logs client IP upon its request
const logIp = (req, res, next): void => {
  console.log('Request received from', req.ip, 'to', req.url);
  next();
}

app.use(express.static(path.join(__dirname, "memegram-app", "build")));
app.use(express.static(path.join(__dirname, "memegram-app", "public")));
app.use(logIp);

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
    res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"))
})

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});