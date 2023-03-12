import UserRepository from "./userRepository.js"
import PostRepository from "./postRepository.js";
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
//     //const t: iResp = await postRep.listBy({key :"b05a8601-6c4e-4eea-906c-f70197c28351"}) 
//     //const t: iResp = await postRep.like({postKey: "b44b6fb2-678a-48c1-947c-f0e1ab0e22f2", userKey: "5672b0ff-dcd9-4e29-82d7-bb991d485b3b"})
//     //const t: iResp = await postRep.comment({postKey: "b44b6fb2-678a-48c1-947c-f0e1ab0e22f2", comment: "test"})
//     console.log(t)
// }
// testPost();

// async function testComment(){
    
// }

export {
    UserRepository, 
    PostRepository
}