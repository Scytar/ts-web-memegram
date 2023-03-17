import { Post } from "../interfaces";
import { getComment } from "../services/commentService";
import PostRepository from "../repository/postRepository"
import iResp from "../interfaces/iResp";

async function listAll() {
    try{
        const postRep = new PostRepository();
        const response: iResp = await postRep.listAll();
        if (!response.error) {
            return response;
        }
    } catch (err: any) {
        return { err: err.message }
    }
}

export async function getFeed() {
    try {
        const feed: Post[] = [];
        const allPost: any = await listAll();
        for (let index = 0; index < allPost.data.length; index++) {
            const postComments = await getComment(allPost.data[index].postId);
            if (!postComments.err) {
                allPost.data[index].post.comments = [];
                postComments.response?.data.forEach((comment: any) =>{
                    allPost.data[index].post.comments.push(comment);
                });
                feed.push(allPost.data[index].post);
        }}
        return feed;
    } catch (err: any) {
        return { err: err.message }
    }
}