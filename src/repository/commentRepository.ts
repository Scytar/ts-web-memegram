import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export default class CommentRepository{
    private commentSchem = new mongoose.Schema({
        key: {
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
    
    private commentModel = mongoose.model('comment', this.commentSchem);

    private async base(resultFunc){
        //Receive an function, make conection with database and run the operation
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            resp.data = await resultFunc;
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }

    async insert(commentData: any){
        //Receive an Object with the data to insert
        const newComment = new this.commentModel({
            key: uuid(),
            comment:{
                author: commentData.author,
                text: commentData.text
            },
            created_at: Date.now()
        });
        const resp: iResp = await this.base(newComment.save())
        return resp;
    }
    
    async listBy(query: any) { 
        //Receive an Object with the comment's key of search
        const resp: iResp = await this.base(this.commentModel.find(query));
        return resp;
    }
}