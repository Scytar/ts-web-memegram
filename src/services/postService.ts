//business rules for posting and feed
import * as dotenv from 'dotenv';
dotenv.config();
import { Post } from "../interfaces";
import PostRepository from "../repository/postRepository"
import iResp from "../interfaces/iResp";

export const newPost = async (dataPost: Post) => {
    try {

        // modelo dataPost
        // dataPost = {
        //     media: '5672b0ff-dcd9-4e29-82d7-bb991d485b3b.png',
        //     autorId: 'd5dd6df9-5393-4b12-8cee-cdd1c59a5004',
        //     autor: 'teste'
        // }

        //---------------------------------------------------------------------------verify
        const postRep = new PostRepository();
        //const response: iResp = await postRep.insert({media: '../../img/download.png', authorId: '5672b0ff-dcd9-4e29-82d7-bb991d485b3b', author: 'test'})
        const response: iResp = await postRep.insert({media: dataPost.media, authorId: dataPost.authorId, author: dataPost.author});
        //---------------------------------------------------------------------------verify

        if (!response.error) {
           return response;
        }
    }
    catch (err: any) {
        return { err: err.message }
    }

}