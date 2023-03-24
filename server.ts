import { IChatElement } from "./memegram-app/src/interfaces/http/chat";

const path = require("path");
const express = require("express");
const cors = require("cors");
const webSocket = require("ws");
const multer = require("multer");
const bodyParser = require("body-parser");
const fs = require('fs')
const https = require('https')


// To anyone testing: the node server runs on port 3030,
// but to avoid rebuilding the react project multiples times
// we run npm run start on port 3000, so all API calls must
// use the proper URL - e.g. http://localhost:3030
// From now on, we are droping the MirageJS fake server depency
const PORT = 443;

const privateKey = fs.readFileSync("../cert/api.key");
const certificate = fs.readFileSync("../cert/api.pem");
const credentials = { key: privateKey, cert: certificate };

const app = express();
const server = https.createServer(credentials,app);
const ws = new webSocket.Server({ server });

//Logs client IP upon its request
const logIp = (req: { ip: any; url: any; }, res: any, next: () => void): void => {
  console.log('Request received from', req.ip, 'to', req.url);
  next();
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "memegram-app", "build")));
app.use(express.static(path.join(__dirname, "memegram-app", "public")));
app.use(logIp);

const users = [
  {
    userId: 'gottagofast',
    username: 'Sonic The Hedgehog',
    password: '1234',
    email: 'hedgehog@sonic.boom',
  },
  {
    userId: '13',
    username: 'Scytar',
    password: '1234',
    email: 'scytar@sonic.boom',
  },
  {
    userId: '1',
    username: 'Macha Down Jr',
    password: '1234',
    email: 'macha@down.com',
  },
]

// Example of data response of chat
const chats: IChatElement[] = [];

// Example of database response of the global feed
const feedItems = [
  {
    postId: "1",
    authorId: "13",
    author: 'Scytar',
    timestamp: new Date(),
    media: 'memegram-logo.webp',
    likes: ["5", "12", "15", "87"],
    comments: [
      {
        commentId: "1001",
        author: 'Macha Down Jr',
        comment: 'Cocoricó!'
      },
      {
        commentId: "1002",
        author: 'Machadette',
        comment: 'Pó pô pó?'
      },
    ],
  },
  {
    postId: "2",
    authorId: "1",
    author: 'Macha Down Jr',
    timestamp: new Date(),
    media: '330355392_947815519559210_1018065495553949514_n.jpg',
    likes: ["1", "13", "15", "87"],
    comments: [],
  },
  {
    postId: "3",
    authorId: "13",
    author: 'Scytar',
    timestamp: new Date(),
    media: 'bonk.jpg',
    likes: ["1", "13", "15", "87"],
    comments: [],
  }
]

// =============== Websocket Channels ===============
const globalFeedChannel = new Set();
const genericChatChannel = new Set();

ws.on('connection', (socket: any, req: any) => {
  // socket.send(JSON.stringify(feedItems))

  //Identify the channel the websocket connection belongs
  if (req.url === '/globalFeed') { //Develop switch cases
    console.log('globalFeed')
    globalFeedChannel.add(socket);
    socket.send(JSON.stringify(feedItems));
  }
  if (req.url === '/chats') {
    console.log('chats')
    genericChatChannel.add(socket);
    const answer = {
      type: 'global chat',
      data: chats,
    }
    socket.send(JSON.stringify(answer));
  }

  // Identify the channel the message sent by the client belongs
  socket.on('message', (message: any) => {
    if (req.url === '/globalFeed') { //Develop switch cases
      globalFeedChannel.forEach((client: any) => {
        if (client.readyState === webSocket.OPEN) {
          client.send(message);
        }
      })
    }
    if (req.url === '/chats') {
      genericChatChannel.forEach((client: any) => {
        if (client.readyState === webSocket.OPEN) {
          client.send(message);
        }
      })
    }
  });


  //Remove the connection from correct channel when closed
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

app.post('/api/login', (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { userId: string; user: string; }): any; new(): any; }; }; sendStatus: (arg0: number) => any; }, next: any) => {
  //TODO: do authentication properly
  const body = req.body;

  let userToReturn = {
    userId: '',
    user: '',
  };

  for (let index = 0; index < users.length; index++) {
    const element = users[index];
    if (element.email === body.email && element.password === body.password) {
      userToReturn = {
        userId: element.userId as string,
        user: element.username as string,
      }
    }
  }
  console.log('userToReturn', userToReturn)
  if (userToReturn.userId != '') {
    return res.status(200).json(userToReturn);
  } else {
    return res.sendStatus(401);
  }
})

app.post('/api/signup', (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { userId: string; user: string; }): void; new(): any; }; }; }, next: any) => {
  // Mock of user registration
  const body = req.body;

  const newUser = {
    userId: '' + Math.random() + new Date(),
    username: body.username,
    password: body.password,
    email: body.email,
  };

  users.push(newUser);

  const userToAnswer = {
    userId: newUser.userId,
    user: newUser.username,
  }

  res.status(200).json(userToAnswer);
})

// TODO: modularize this
// ============ Code-block start ============

const storage = multer.diskStorage({
  destination: (req: any, file: any, cb: (arg0: null, arg1: string) => void) => {
    // This must be an express.static served folder
    cb(null, "memegram-app/public");
  },
  filename: (req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void): void => {
    // Database must store filename string with extension
    // It would be better to hash this filename
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req: { body: { body: string; }; file: { filename: any; }; }, res: { send: (arg0: string) => void; }, next: any) => {


  const data = JSON.parse(req.body.body); // data = { token: string , userId: string }

  const newPost = {
    postId: '' + Math.random(),
    authorId: data.userId,
    author: data.user,
    timestamp: new Date(),
    media: req.file.filename,
    likes: [],
    comments: [],
  }

  feedItems.push(newPost);

  globalFeedChannel.forEach((client: any) => {
    if (client.readyState === webSocket.OPEN) {
      client.send(JSON.stringify(feedItems));
    }
  });

  res.send(`File ${req.file.filename} uploaded successfully.`)
})

// ============ Code-block end ============

app.get("/", (req: any, res: { sendFile: (arg0: any) => void; }, next: any) => {
  res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

app.get('/api/feedItems', (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { feedItems: { postId: string; authorId: string; author: string; timestamp: Date; media: string; likes: string[]; comments: { commentId: string; author: string; comment: string; }[]; }[]; }): void; new(): any; }; }; }, next: any) => {
  res.status(200).json({ feedItems: feedItems })
});

app.put('/api/like', (req: { body: { postId: string; userId: string; }; }, res: { sendStatus: (arg0: number) => void; }, next: any) => {

  feedItems.forEach((element, elementIndex) => {
    if (element.postId === req.body.postId) {
      const index = element.likes.findIndex((el) => {
        return el == req.body.userId;
      });
      if (index != -1) {
        feedItems[elementIndex].likes.splice(index, 1);
      } else {
        element.likes.push(req.body.userId)
      }
    }
  })

  globalFeedChannel.forEach((client: any) => {
    if (client.readyState === webSocket.OPEN) {
      client.send(JSON.stringify(feedItems));
    }
  });

  res.sendStatus(200)
})

app.post('/api/comment', (req: { body: any; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: string): void; new(): any; }; }; }, next: any) => {
  const body = req.body;

  let updatePost;

  feedItems.forEach((element, index): void => {
    if (element.postId === body.postId) {
      const newComment = {
        commentId: "" + Math.random(),
        author: body.user,
        comment: body.comment
      };
      feedItems[index].comments.push(newComment);

      updatePost = feedItems[index];
    }
  });

  globalFeedChannel.forEach((client: any) => {
    if (client.readyState === webSocket.OPEN) {
      client.send(JSON.stringify(feedItems));
    }
  })

  //Must return
  res.status(201).json(JSON.stringify(updatePost));
})

// User sent a new chat message
app.put('/api/chat', (req: { body: any; }, res: { sendStatus: (arg0: number) => any; }, next: any) => {
  const body = req.body;

  const newMessage = {
    messageId: 'msg' + Math.random(),
    username: body.username as string,
    dateWithTime: '' + new Date(),
    message: body.messageText as string,
  };

  let chatElementToAnswer: {
    chatId: string;
    chatName: string;
    chatRoles: { owner: string; };
    participants: {
      userId: string;
      username: string;
    }[];
    messages: {
      messageId: string;
      username: string;
      dateWithTime: string;
      message: string;
    }[];
  } | null;

  try {
    chats.forEach((element, elementIndex) => {
      if (element.chatId === body.chatId) {
        const index = element.participants.findIndex((el) => {
          return el.userId == body.userId;  //Check if user is a participant
        });
        if (index != -1) {
          chats[elementIndex].messages.push(newMessage); //Add the new message in the database
          chatElementToAnswer = chats[elementIndex];
        } else {
          throw 'not a participant';
        }
      }
    })
  } catch (error) {
    chatElementToAnswer = null;
    error == 'not a participant' ? res.sendStatus(403) : res.sendStatus(500);
  }



  //Send websocket message to all clients in the chat channel
  genericChatChannel.forEach((client: any) => {
    if (client.readyState === webSocket.OPEN) {
      if (chatElementToAnswer) {
        const answer = {
          type: 'single chat',
          data: chatElementToAnswer,
        }
        client.send(JSON.stringify(answer));
      };
    }
  })

  return res.sendStatus(200);
})

// Owner of chat updated or created a chat
app.post('/api/chats/', (req: { body: any; }, res: { sendStatus: (arg0: number) => any; }, next: any) => {
  const body = req.body;
  console.log('body', body)

  let chatElementToAnswer: IChatElement | null = null;

  try {
    if (body.chatId === '0') {

      let participantsList: { userId: string, username: string }[] = [];

      body.participants.forEach((participant: { userId: string, username: string }) => {

        for (let index = 0; index < users.length; index++) {
          const element = users[index];
          if (element.username === participant.username) {
            const newParticipant = {
              userId: element.userId,
              username: participant.username,
            }
            participantsList.push(newParticipant);
          }
        }
      })

      chatElementToAnswer = {
        chatId: '' + Math.random(),
        chatName: body.chatName,
        chatRoles: {
          owner: body.userId,
        },
        participants: participantsList, //The server needs to check if the all the users exist before setting this value
        messages: []
      }

      console.log('chatElementToAnswer', chatElementToAnswer)
      chats.push(chatElementToAnswer);

      //Send websocket message to all clients in the chat channel
      genericChatChannel.forEach((client: any) => {
        if (client.readyState === webSocket.OPEN) {
          if (chatElementToAnswer) {
            const answer = {
              type: 'single chat',
              data: chatElementToAnswer,
            }
            client.send(JSON.stringify(answer));
          };
        }
      })
    } else {

      let participantsList: { userId: string, username: string }[] = [];

      chats.forEach((element, elementIndex) => {
        if (element.chatId === body.chatId && body.userId === element.chatRoles.owner) { // Check if user is the owner

          participantsList = body.participants;

          for (let index = 0; index < participantsList.length; index++) {
            const participant = participantsList[index];

            if (participant.userId === 'toGivenByTheServer') { // O front mandou alguém novo?
              for (let i = 0; i < users.length; i++) { // Procura na lista de todos os usuários...
                const user = users[i];
                if (user.username === participant.username) { // ...se tem um com esse nome que o front pediu
                  participantsList[index].userId = user.userId; // Se tiver, atualiza o id dele
                }                                               // (Não fiz aqui) Se não tiver, remove esse cara da lista de participantes
              }
            }
          }


          chats[elementIndex].participants = participantsList;
          chats[elementIndex].chatName = body.chatName;

          chatElementToAnswer = chats[elementIndex];
          console.log('chatElementToAnswer-update', chatElementToAnswer);
        }

        //Send websocket message to all clients in the chat channel
        genericChatChannel.forEach((client: any) => {
          if (client.readyState === webSocket.OPEN) {
            if (chatElementToAnswer) {
              const answer = {
                type: 'single chat',
                data: chatElementToAnswer,
              }
              client.send(JSON.stringify(answer));
            };
          }
        })
      })
    }
  } catch (error) {
    chatElementToAnswer = null;
    error == 'not a participant' ? res.sendStatus(403) : res.sendStatus(500);
  }
  chatElementToAnswer ? res.sendStatus(200) : null;
})

app.delete('/api/chats', (req: { body: any; }, res: { sendStatus: (arg0: number) => void; }, next: any) => {
  const body = req.body;
  console.log('delete', body);

  if (body.userId === body.chatRoles.owner) {
    chats.forEach((element, elementIndex) => {
      if (element.chatId === body.chatId) {
        chats[elementIndex].participants = [];
        res.sendStatus(200);

        genericChatChannel.forEach((client: any) => {
          if (client.readyState === webSocket.OPEN) {
            const answer = {
              type: 'single chat',
              data: chats[elementIndex],
            }
            client.send(JSON.stringify(answer));
          };
        })
      }
    })
  } else {
    res.sendStatus(403);
  }
})

app.get

// This route MUST be the last one, as its generic and will redirect the URL to the react-router
app.get("/*", (req: any, res: { sendFile: (arg0: any) => void; }, next: any) => {
  res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
