// inicialização do servidor
import express from 'express';
import router from './src/routes/index';
import cookieParser from 'cookie-parser';
import WebSocket from 'ws';
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import fs from "fs";
import http from "http";
import {getFeed} from './src/services/feedService';
import {getChat} from './src/services/chatService';

// async function server() {
const app = express();
const server = require('http').createServer(app);
const ws = new WebSocket.Server({server});

app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "memegram-app", "build")));
app.use(express.static(path.join(__dirname, "memegram-app", "public")));

// const privateKey = fs.readFileSync("../cert/api.key");
// const certificate = fs.readFileSync("../cert/api.pem");
// const credentials = { key: privateKey, cert: certificate };

// const chats = await getChat();

app.use('/api', router);
// Main Static HTML
console.log(path.join(__dirname, "memegram-app", "build", "index.html"))
router.get("/", (req : any, res : {
    sendFile: (arg0 : any) => void;
}, next : any) => {
    res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})
server.listen(process.env.PORT, () => console.log('Server running on port' + process.env.PORT));

// =============== Websocket Channels ===============
export const globalFeedChannel = new Set();
export const genericChatChannel = new Set();

ws.on('connection', (socket : any, req : any) => {
    // socket.send(JSON.stringify(feedItems))

    // Identify the channel the websocket connection belongs
    if (req.url === '/globalFeed') { // Develop switch cases
        console.log('globalFeed')
        globalFeedChannel.add(socket);
        getFeed().then((res) => {
            console.log('getFeed',res)
            socket.send(JSON.stringify(res));
        }).catch(function (erro) {
            console.error(erro);
        });
    }
    if (req.url === '/chats') {
        console.log('chats')
        genericChatChannel.add(socket);
        const answer = {
            type: 'global chat',
            data: getChat()
        }
        socket.send(JSON.stringify(answer));
    }

    // Identify the channel the message sent by the client belongs
    // socket.on('message', (message : any) => {
    //     if (req.url === '/globalFeed') { // Develop switch cases
    //         globalFeedChannel.forEach((client : any) => {
    //             if (client.readyState === WebSocket.OPEN) {
    //                 client.send(message);
    //             }
    //         })
    //     }
    //     if (req.url === '/chats') {
    //         genericChatChannel.forEach((client : any) => {
    //             if (client.readyState === WebSocket.OPEN) {
    //                 client.send(message);
    //             }
    //         })
    //     }
    // });

    // Remove the connection from correct channel when closed
    socket.on('close', () => {
        if (req.url === '/globalFeed') {
            console.log('socket close')
            globalFeedChannel.delete(socket);
        }
        if (req.url === '/chats') {
            console.log('socket close')
            genericChatChannel.delete(socket);
        }
    });
});
// =============== END of Websocket Channels ===============
// }
// server();
