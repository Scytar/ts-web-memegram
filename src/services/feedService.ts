import { Post } from "../interfaces";
import { getComment } from "../services/commentService";
import PostRepository from "../repository/postRepository"
import iResp from "../interfaces/iResp";

const TAG = 'feedService'

async function listAll() {
    try{
        console.log(TAG,'listAll')
        const postRep = new PostRepository();
        const response: iResp = await postRep.listAll();
        if (!response.error) {
            return response;
        }
    } catch (err: any) {
        console.log(TAG,'listAll', err)
        return { err: err.message }
    }
}

export async function getFeed() {
    try {
        console.log(TAG,'getFeed')
        const feed: Post[] = [];
        const allPost: any = await listAll();
        for (let index = 0; index < allPost.data.length; index++) {
            const postComments = await getComment(allPost.data[index].postId);
            if (!postComments.err) {
                allPost.data[index].post.comments = [];
                postComments.response?.data.forEach((item: any) =>{
                    const singleComment = {
                        commentId: item.commentId,
                        author: item.comment.author,
                        comment: item.comment.text
                    } 
                    allPost.data[index].post.comments.push(singleComment);
                });
                const singlePost = {
                    postId: allPost.data[index].postId,
                    authorId: allPost.data[index].post.authorId,
                    author: allPost.data[index].post.author,
                    timestamp: allPost.data[index].created_at,
                    media: allPost.data[index].post.media,
                    likes: allPost.data[index].post.likes,
                    comments: allPost.data[index].post.comments
                }
                feed.push(singlePost);
        }}
        return feed;
    } catch (err: any) {
        console.log(TAG,'getFeed', err)
        return { err: err.message }
    }
}