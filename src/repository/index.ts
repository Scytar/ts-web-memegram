import UserRepository from "./userRepository.js"
import PostRepository from "./postRepository.js";
import CommentRepository from "./commentRepository.js";
import iResp from "../interfaces/iResp.js";

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
//     //const t: iResp = await postRep.like({postId: "99226fd8-6c81-496f-931a-1fd788d8b605", userId: "05bdfc68-4add-4d7a-abb9-22d8b59fff32"})
//     //const t: iResp = await postRep.comment({postId: "99226fd8-6c81-496f-931a-1fd788d8b605", comment:{author: 'test2', text:'test comment2'}})
//     console.log(t)
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