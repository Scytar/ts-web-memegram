import UserRepository from "./userRepository.js"
import PostRepository from "./postRepository.js";
import CommentRepository from "./commentRepository.js";
import iResp from "../interfaces/iResp.js";

// async function testUser(){
//     const userRep = new UserRepository();
//     //const t: iResp = await userRep.insert({name:'test', email:'test@teste.com', password:"0000"})
//     //const t: iResp = await userRep.listAll()
//     //const t: iResp = await userRep.listBy({key:"5672b0ff-dcd9-4e29-82d7-bb991d485b3b"}) 
//     //const t: iResp = await userRep.update({query:{key:"5672b0ff-dcd9-4e29-82d7-bb991d485b3b"}, content:{"user.name":"test3", "user.email":"test3@test.com"}})
//     //const t: iResp = await userRep.deleteBy({query:{key:"5672b0ff-dcd9-4e29-82d7-bb991d485b3b"}});
//     console.log(t)
// }
// testUser();

// async function testPost(){
//     const postRep = new PostRepository();
//     //const t: iResp = await postRep.insert({media: '../../img/download.png', authorId: '5672b0ff-dcd9-4e29-82d7-bb991d485b3b', author: 'test'})
//     //const t: iResp = await postRep.listAll();
//     //const t: iResp = await postRep.listBy({key :"e2546030-1785-4ae9-9a3a-86a58147eb23"});
//     //const t: iResp = await postRep.like({postKey: "b44b6fb2-678a-48c1-947c-f0e1ab0e22f2", userKey: "5672b0ff-dcd9-4e29-82d7-bb991d485b3b"})
//     //const t: iResp = await postRep.comment({postKey: "e2546030-1785-4ae9-9a3a-86a58147eb23", comment:{author: 'test', text:'test comment'}})
//     //console.log(t)
// }
// testPost();

// async function testComments(){
//     const postRep = new PostRepository();
//     const comment = new CommentRepository();
//     //Get a post by key
//     const t: iResp = await postRep.listBy({key :"e2546030-1785-4ae9-9a3a-86a58147eb23"});
//     const result = t.data[0].post;
//     for (let index = 0; index < result.comments.length; index++) {
//         //Receive all comments ids of post and return each comment
//         const comments = await comment.listBy({key: result.comments[index]}) 
//         console.log(comments.data[0].comment);
//     }
// }
// testComments()

export {
    UserRepository, 
    PostRepository,
    CommentRepository
}