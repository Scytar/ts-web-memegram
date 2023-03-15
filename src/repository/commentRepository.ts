import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const commentSchem = new mongoose.Schema({
    commentId: {
        type: String,
        unique: true
    },
    comment: {
        author: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true 
        }
    },
    created_at: Date
})

const commentModel = mongoose.model('comment', commentSchem);

export default class CommentRepository{

    async insert(commentData: any){
        //Receive an Object with the data to insert
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const newComment = new commentModel({
                commentId: uuid(),
                comment:{
                    author: commentData.author,
                    text: commentData.text
                },
                created_at: Date.now()
            });
            resp.data = await newComment.save();
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
    
    async listBy(query: any) { 
        //Receive an Object with the comment's key of search
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            resp.data = await commentModel.find(query);
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
}