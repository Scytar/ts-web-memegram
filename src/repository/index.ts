import UserRepository from "./userRepository.js"
import PostRepository from "./postRepository.js";
import iResp from "../interfaces/iResp.js";
const userRep = new UserRepository();

// async function testUser(){
//     //const t: iResp = await userRep.insert({name:'test', email:'test@teste.com', password:"0000"})
//     //const t: iResp = await userRep.listAll()
//     //const t: iResp = await userRep.listBy({query:"b05a8601-6c4e-4eea-906c-f70197c28351"}) 
//     //const t: iResp = await userRep.update({query:{_id:"64092dfbb765142be2a75195"}, content:{"user.name":"test", "user.email":"test2@test.com"}})
//     //const t: iResp = await userRep.deleteBy({query:{_id:"6407fcd2ba7cfd9f65cde4d2"}});
//     console.log(t.data[0].user)
// }
// testUser();

// async function testPost(){
//     const postRep = new PostRepository();
//     //const t: iResp = await postRep.insert({media: '../../img/download.png', authorId: '6e3b98db-961e-47c8-be9a-84164341af98', author: 'test'})
//     const t: iResp = await postRep.listAll();
//     //const t: iResp = await postRep.listBy({key :"b05a8601-6c4e-4eea-906c-f70197c28351"}) 
//     //const t: iResp = await postRep.like({postKey: "b05a8601-6c4e-4eea-906c-f70197c28351", userKey: "6e3b98db-961e-47c8-be9a-84164341af98"})
//     //const t: iResp = await postRep.unlike({postKey: "b05a8601-6c4e-4eea-906c-f70197c28351", userKey: "6e3b98db-961e-47c8-be9a-84164341af98"})
//     //const t: iResp = await postRep.comment({postKey: "b05a8601-6c4e-4eea-906c-f70197c28351", comment: "test2"})
//     console.log(t)
// }
// testPost();

// async function testComment(){
    
// }

export {
    UserRepository, 
    PostRepository
}