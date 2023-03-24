//business rules for posting and feed
import * as dotenv from 'dotenv';
dotenv.config();
import { Post } from "../interfaces";
import PostRepository from "../repository/postRepository"
import iResp from "../interfaces/iResp";

const TAG = 'postService'

export const newPost = async (dataPost: Post) => {
    try {
        console.log(TAG,'newPost');
        // modelo dataPost
        // dataPost = {
        //     media: '5672b0ff-dcd9-4e29-82d7-bb991d485b3b.png',
        //     autorId: 'd5dd6df9-5393-4b12-8cee-cdd1c59a5004',
        //     autor: 'teste'
        // }

        //---------------------------------------------------------------------------
        const postRep = new PostRepository();
        const response: iResp = await postRep.insert({media: dataPost.media, authorId: dataPost.authorId, author: dataPost.author});
        //---------------------------------------------------------------------------

        if (!response.error) {
           return response;
        }
    }
    catch (err: any) {
        console.log(TAG,'newPost', err);
        return { err: err.message }
    }

}