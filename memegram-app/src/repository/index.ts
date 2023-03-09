import UserRepository from "./userRepository.js"
import PostRepository from "./postRepository.js";

// async function testUser(){
//     const userRep = new UserRepository();
//     //const t: any = await userRep.insert({name:'test', email:'test@teste.com', password:"0000"})
//     //const t: any = await userRep.listAll()
//     //const t: any = await userRep.update({query:{_id:"64092dfbb765142be2a75195"}, content:{"user.name":"test", "user.email":"test2@test.com"}})
//     //const t: any = await userRep.deleteBy({query:{_id:"6407fcd2ba7cfd9f65cde4d2"}});
//     console.log(t)
// }
// testUser();

// async function testPost(){
//     const postRep = new PostRepository();
//     const t: any = await postRep.insert({src: '../../img/download.png', id_user: '640933270baadf0dfe3dd2c7'})
//     //const t: any = await postRep.listAll()
//     console.log(t)
// }
// testPost();

export {
    UserRepository, 
    PostRepository
}