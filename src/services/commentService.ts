//business rules for posting and feed
import * as dotenv from 'dotenv';
dotenv.config();
import { Comment } from "../interfaces";
import PostRepository from "../repository/postRepository"
import CommentRepository from "../repository/commentRepository"
import iResp from "../interfaces/iResp";
import { getFeed } from './feedService'

export const insertComment = async (dataComment: Comment) => {
    try {

        //dataComment model 
        // dataComment = { postId: '753314e2-2b78-465e-9815-b773c89f238a',
        //                 comment: {
        //                    author: 'test',
        //                    text: 'love these memes'
        //                 }
        //                authorId: 'ddefa090-8cf8-4d68-88d5-5ec2ad9f1275',
        // }

        //---------------------------------------------------------------------------
        const postRep = new PostRepository();
        const response: iResp = await postRep.comment({ postId: dataComment.postId, comment: { author: dataComment.user, text: dataComment.comment } });
        //---------------------------------------------------------------------------

        if (!response.error) {
            const feed = await getFeed();
            return { feed };
        } else {
            throw new Error(`${response.error}`);
        }
    }
    catch (err: any) {
        console.log('comment-err:',err)
        return { err: err.message }
    }

}


export const getComment = async (postId: string) => {
    try {

        //---------------------------------------------------------------------------
        const postRep = new PostRepository();
        const comment = new CommentRepository();

        //Get a post by key
        const post: iResp = await postRep.listBy({ postId: postId });
        if (post.data[0].post) {
            const result = post.data[0].post;
            const response: iResp = {
                data: [],
                error: null
            };
            for (let index = 0; index < result.comments.length; index++) {
                //Receive all comments ids of post and return each comment
                const comments = await comment.listBy({ commentId: result.comments[index] });
                response.data.push(comments.data[0]);
            }
            return { response };
        } else {
            throw new Error(`${post.error}`);
        }
        //---------------------------------------------------------------------------
    }
    catch (err: any) {
        return { err: err.message }
    }

}