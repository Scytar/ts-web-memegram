import UserRepository from "./userRepository.js"
import PostRepository from "./postRepository.js";
import CommentRepository from "./commentRepository.js";
import ChatRepository from "./chatRepository.js";
import { getChat } from "../services/chatService.js"
import iResp from "../interfaces/iResp.js";
import MessageRepository from "./messageRepository.js";

// async function testChat() {
//     const chatRep = new ChatRepository();
//     //const t = await chatRep.insert({chatName:'Hyrule', owner:'Zelda'});
//     //const t = await chatRep.msgSend({chatId: '7feeb479-e04d-4686-85e0-35729ef43f1b', message: {username:'Zelda', text:'Link, deu ruim! De novo hihi!'}})
//     //const t = await chatRep.addPart({chatId: "454b63d2-67de-4db5-94ba-d061358b7f83", username: 'Luigi'})
//     //const t = await getChat();
//     console.log(t);
// }
// testChat()

// async function testMessage() {
//     const messageRep = new MessageRepository();
//     //const t = await messageRep.insert({username:'Mario', text:'Luigi, e esse ouriço?'});
//     //const t = await messageRep.listBy({messageId: 'f5951f35-81f1-4df3-afa3-6902c15de62a'})
//     console.log(t);
// }
// testMessage()

// async function testUser(){
//     const userRep = new UserRepository();
//     //const t: iResp = await userRep.insert({name:'test2', email:'test2@teste.com', password:"0000"})
//     //const t: iResp = await userRep.listAll()
//     //const t: iResp = await userRep.listBy({userId:"05bdfc68-4add-4d7a-abb9-22d8b59fff32"}) 
//     //const t: iResp = await userRep.update({query:{userId:"5672b0ff-dcd9-4e29-82d7-bb991d485b3b"}, content:{"user.name":"test3", "user.email":"test3@test.com"}})
//     //const t: iResp = await userRep.deleteBy({query:{userId:"5672b0ff-dcd9-4e29-82d7-bb991d485b3b"}});
//     console.log(t)
// }
// testUser();

// async function testPost(){
//     const postRep = new PostRepository();
//     //const t: iResp = await postRep.insert({media: 'download.png', authorId: '05bdfc68-4add-4d7a-abb9-22d8b59fff32', author: 'test'})
//     //const t: iResp = await postRep.listAll();
//     //const t: iResp = await postRep.listBy({postId :"e2546030-1785-4ae9-9a3a-86a58147eb23"});
//     //const t: iResp = await postRep.like({postId: "424eb7a9-a4d7-4f88-8f4c-27789fb11a7e", userId: "89311d70-69c9-4899-8fca-537f9a272c4a"})
//     //const t: iResp = await postRep.comment({postId: "424eb7a9-a4d7-4f88-8f4c-27789fb11a7e", comment:{author: 'test', text:'test comment'}})

//     //console.log(t)
// }
// testPost();

// async function testComments(){
//     const postRep = new PostRepository();
//     const comment = new CommentRepository();
//     //Get a post by key
//     const t: iResp = await postRep.listBy({postId :"424eb7a9-a4d7-4f88-8f4c-27789fb11a7e"});
//     console.log(t, 't')
//     const result = t.data[0].post;
//     for (let index = 0; index < result.comments.length; index++) {
//         //Receive all comments ids of post and return each comment
//         const comments = await comment.listBy({commentId: result.comments[index]}) 
//         console.log(comments.data[0].comment, 'final');
//     }
// }
// testComments()

export {
    UserRepository, 
    PostRepository,
    CommentRepository
}