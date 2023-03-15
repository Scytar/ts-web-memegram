const path = require("path");
const express = require("express");
const cors = require("cors");
const webSocket = require("ws");
const multer = require("multer");
const bodyParser = require("body-parser");

// To anyone testing: the node server runs on port 3030,
// but to avoid rebuilding the react project multiples times
// we run npm run start on port 3000, so all API calls must
// use the proper URL - e.g. http://localhost:3030
// From now on, we are droping the MirageJS fake server depency
const PORT = 3030;

const app = express();
const server = require('http').createServer(app);
const ws = new webSocket.Server({ server });

//Logs client IP upon its request
const logIp = (req, res, next): void => {
  console.log('Request received from', req.ip, 'to', req.url);
  next();
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "memegram-app", "build")));
app.use(express.static(path.join(__dirname, "memegram-app", "public")));
app.use(logIp);

// TODO: a lot of the code below needs to be modularized

const userInfo = {
  token: '987654321',
  userId: 'gottagofast',
  user: 'Sonic The Hedgehog',
}

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
        author: 'Machadão',
        comment: 'Cocoricó!'
      },
      {
        commentId: "1002",
        author: 'Machadette',
        comment: 'Pó pô pó?'
      },
      {
        commentId: "1012",
        author: 'Machadette',
        comment: 'Lorem ipsum dolor sit amet bigles et bagles furer hop daenerius sut probatus fuerit accipiet coronam vitae?'
      },
      {
        commentId: "1032",
        author: 'Machadette',
        comment: 'Pó pô pó?'
      },
    ],
  },
  {
    postId: "3",
    authorId: "12",
    author: 'Cecília',
    timestamp: new Date(),
    media: 'memegram-logo-circle.webp',
    likes: ["13", "15"],
    comments: [
      {
        commentId: "1003",
        author: 'Machadão',
        comment: 'Cocó coricocó!'
      },
      {
        commentId: "1004",
        author: 'Machadette',
        comment: 'Lorem ipsum dolor sit amet bigles et bagles furer hop daenerius sut probatus fuerit accipiet coronam vitae'
      },
    ],
  },
  {
    postId: "4",
    authorId: "1",
    author: 'Machadão',
    timestamp: new Date(),
    media: 'memegram-logo-circle.webp',
    likes: ["1", "13", "15", "87"],
    comments: [
      {
        commentId: "1006",
        author: 'Machadão',
        comment: 'Cocó coricocó!'
      },
      {
        commentId: "1005",
        author: 'Machadette',
        comment: 'Lorem ipsum dolor sit amet bigles et bagles furer hop daenerius sut probatus fuerit accipiet coronam vitae'
      },
    ],
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
  }

  // Identify the channel the message sent by the client belongs
  socket.on('message', (message) => {
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

app.get('/api/userInfo/:token', (req, res, next) => {
  //TODO: do authentication properly
  req.params.token !== '987654321' ?
    res.status(200).json({ userInfo: userInfo }) :
    res.sendStatus(401);
})

// TODO: modularize this
// ============ Code-block start ============

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // This must be an express.static served folder
    cb(null, "memegram-app/public");
  },
  filename: (req, file, cb) => {
    // Database must store filename string with extension
    // It would be better to hash this filename
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post('/api/upload', upload.single('file'), (req, res, next) => {


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
  // console.log(`req`, req)
  // console.log('file', req.file);
  // console.log('data', data);

  globalFeedChannel.forEach((client: any) => {
    if (client.readyState === webSocket.OPEN) {
      client.send(JSON.stringify(feedItems));
    }
  });

  res.send(`File ${req.file.filename} uploaded successfully.`)
})

// ============ Code-block end ============

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

app.get('/api/feedItems', (req, res, next) => {
  res.status(200).json({ feedItems: feedItems })
});

app.put('/api/like', (req, res, next) => {
  console.log('body', req.body)

  feedItems.forEach((element, elementIndex) => {
    if (element.postId === req.body.postId) {
      const index = element.likes.findIndex((el)=> {
        // console.log('el',el);
        return el == req.body.userId;
      });
      // console.log('index',index);
      if (index != -1) {
        feedItems[elementIndex].likes.splice(index, 1);
        // console.log('element',element.likes);
      } else {
        element.likes.push(req.body.userId)
        // console.log('element',element.likes);
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

app.post('/api/comment', (req, res, next) => {
  const body = req.body;
  console.log('body', body);

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

// This route MUST be the last one, as its generic and will redirect the URL to the react-router
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});