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

app.get('/api/userInfo', (req, res, next) => {
  const userInfo = {
    token: 'asd',
    userId: '123',
  }
  res.status(200).json({userInfo: userInfo});
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

const upload = multer({storage});

app.post('/api/upload', upload.single('file') ,(req, res, next) => {

  const data = JSON.parse(req.body.body); // data = { token: string , userId: string }

  console.log('file', req.file);
  console.log('data', data);
  res.sendStatus(201)
})

// ============ Code-block end ============

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

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

app.get('/api/feedItems', (req, res, next) => {
  res.status(200).json({feedItems: feedItems})
});

app.post('/api/comment', (req, res, next) => {
  const body = req.body;
  
  let updatePost;

  feedItems.forEach((element, index): void => {
    if (element.postId === body.postId) {
      const newComment = {
        commentId: "" + Math.random(),
        author: body.userId,
        comment: body.comment
      };
      feedItems[index].comments.push(newComment);

      updatePost = feedItems[index];
    }
  });

  res.status(201).json(JSON.stringify(updatePost));
})

// This route MUST be the last one, as its generic and will redirect the URL to the react-router
app.get("/*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "memegram-app", "build", "index.html"));
})

server.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});