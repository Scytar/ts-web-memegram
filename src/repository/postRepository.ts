import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const postSchem = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    post: {
        authorId: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        media: {
            type: String,
            required: true,
        },
        likes: Array<String>,
        comments: Array<any>
    },
    created_at: Date,
})

const postModel = mongoose.model('post', postSchem);

export default class PostRepository{
    async insert(postData: any){
        //Receive an Object with the data to insert
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const newPost = new postModel({
                key: uuid(),
                post: {      
                    authorId: postData.authorId,
                    author: postData.author,
                    media: postData.media,
                    likes: [],
                    comments:[]
                },
                created_at: Date.now()
            });
            const result: any = await newPost.save()
            if(result){
                resp.data = `Postagem realizada com sucesso!`;
            };
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
    
    async listAll() {
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const result: any = await postModel.find();
            if (result) {
                resp.data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
    
    async listBy(query: any) { 
        //Receive an Object with the filter of search
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const result: any = await postModel.find(query);
            if (result) {
                resp.data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }

    async like(postData: any){
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const result = await postModel.findOne(
                {key: postData.postKey}
            );
            if (result) {
                result?.post?.likes?.push(postData.userKey);
                await result.save();
                resp.data = 'Liked';
             }
            await mongoose.connection.close();
        } catch (err) {
            resp.error = err.message;
        }
        return resp;
    }

    async unlike(postData: any){
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const result = await postModel.findOne(
                {key: postData.postKey}
            );
            if (result) {
                const index = result?.post?.likes?.indexOf(postData.userKey);
                result?.post?.likes?.splice(index, 1);
                await result.save();
                resp.data = 'Unliked';
            }
            await mongoose.connection.close();
        } catch (err) {
            resp.error = err.message;
        }
        return resp;
    }

    async comment(postData: any){
        let resp: iResp = {data: null, error: null};
        try{
            await mongoose.connect(MONGODB_DSN);
            const result = await postModel.findOne(
                {key: postData.postKey}
            );
            if (result) {
                result?.post?.comments?.push(postData.comment);
                await result.save();
                resp.data = 'Commented';
            }
            await mongoose.connection.close();
        }catch (err) {
            resp.error = err.message;
        }
        return resp;
    }
}