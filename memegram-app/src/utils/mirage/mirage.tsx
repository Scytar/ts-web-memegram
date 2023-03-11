import { createServer, Response, Server } from 'miragejs';
import { IPostProps } from '../../components/organisms';

// This mock server is designed to be used in a test environment
// the goal is to mimic the actual server that will be used in production
// it suppose to return a json objects that will be used to populate the UI
// they are suppose to represent feed items from a social media feed
// below is an example of valid json object that can be returned
// it can be used as a model for others. 
// Model last Updated at 2023-03-09

const feedItems: IPostProps[] = [
  {
    key: "1",
    authorId: "13",
    author: 'Scytar',
    timestamp: new Date(),
    media: 'memegram-logo.webp',
    likes: ["5", "12", "15", "87"],
    comments: [
      {
        key: "1001",
        author: 'Machadão',
        comment: 'Cocoricó!'
      },
      {
        key: "1002",
        author: 'Machadette',
        comment: 'Pó pô pó?'
      },
      {
        key: "1012",
        author: 'Machadette',
        comment: 'Lorem ipsum dolor sit amet bigles et bagles furer hop daenerius sut probatus fuerit accipiet coronam vitae?'
      },
      {
        key: "1032",
        author: 'Machadette',
        comment: 'Pó pô pó?'
      },
    ],
  },
  {
    key: "3",
    authorId: "12",
    author: 'Cecília',
    timestamp: new Date(),
    media: 'memegram-logo-circle.webp',
    likes: ["13", "15"],
    comments: [
      {
        key: "1003",
        author: 'Machadão',
        comment: 'Cocó coricocó!'
      },
      {
        key: "1004",
        author: 'Machadette',
        comment: 'Lorem ipsum dolor sit amet bigles et bagles furer hop daenerius sut probatus fuerit accipiet coronam vitae'
      },
    ],
  },
  {
    key: "4",
    authorId: "1",
    author: 'Machadão',
    timestamp: new Date(),
    media: 'memegram-logo-circle.webp',
    likes: ["1", "13", "15", "87"],
    comments: [
      {
        key: "1006",
        author: 'Machadão',
        comment: 'Cocó coricocó!'
      },
      {
        key: "1005",
        author: 'Machadette',
        comment: 'Lorem ipsum dolor sit amet bigles et bagles furer hop daenerius sut probatus fuerit accipiet coronam vitae'
      },
    ],
  }
]

const updateLike = (_postId: string, _userId: string): void => {
  const postIndex = feedItems.findIndex(post => post.key === _postId);

  if (postIndex) {
    const postToUpdate = feedItems.splice(postIndex,1)[0];
    const likeIndex = postToUpdate.likes.findIndex(userId => userId === _userId)

    if (likeIndex !== -1) {
      postToUpdate.likes.splice(likeIndex,1);
    } else {
      postToUpdate.likes.push(_userId);
    }
    feedItems.push(postToUpdate);
  }
}

const userInfo = {
  token: 'asd',
  userId: '12',
}

const failedUser = {
}

const makeServer = (): Server => {
  const server = createServer({
    routes() {

      this.get('/api/feedItems', () => {
        return new Response(200, {}, {feedItems}); 
      });

      this.put('/api/like-post', (schema, req) => {
        const body = JSON.parse(req.requestBody)
        updateLike(body.postId, body.userId);
        return new Response(200, {}, {feedItems});
      });

      this.get('api/userInfo', () => {
        if (Math.random() > 0.5) {
          return new Response(200, {}, {userInfo});
        } else {
          return new Response(200, {}, {failedUser}) 
        }       
      })
    },
  });

  return server;
}

export { makeServer };