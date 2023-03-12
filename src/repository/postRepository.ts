import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";
import CommentRepository from "./commentRepository.js";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

export default class PostRepository{
    private postSchem = new mongoose.Schema({
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
            comments: Array<String>
        },
        created_at: Date,
    })
    
    private postModel = mongoose.model('post', this.postSchem);

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

    async insert(postData: any){
        //Receive an Object with the data to insert
        const newPost = new this.postModel({
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
        const resp:iResp = await this.base(newPost.save())
        return resp;
    }
    
    async listAll() {
        const resp: iResp = await this.base(this.postModel.find());
        return resp;
    }
    
    async listBy(query: any) { 
        //Receive an Object with the filter of search
        const resp: iResp = await this.base(this.postModel.find(query));
        if (resp.data[0] == null) {
            resp.error = "Error: not found" 
        }
        return resp;
    }

    async like(postData: any){
        //Add or remove a like based on user key
        let resp: iResp = await this.base(this.postModel.findOne(
            {key: postData.postKey}
        ));
        if (!resp.data.post.likes.includes(postData.userKey)) {
            await mongoose.connect(MONGODB_DSN);
            resp.data.post.likes.push(postData.userKey);
            console.log(resp.data)
            resp = await this.base(resp.data.save());
        } else{
            await mongoose.connect(MONGODB_DSN);
            const index = resp.data.post.likes.indexOf(postData.userKey);
            resp.data.post.likes.splice(index, 1);
            resp = await this.base(resp.data.save());
        }
        return resp;
    }

    async comment(postData: any){
        //Add a comment in a post
        let resp: iResp = await this.base(this.postModel.findOne(
            {key: postData.postKey}
        ));
        if (resp.data) {
            const comment = new CommentRepository();
            const result = await comment.insert(postData.comment);
            if (!result.data) {
                resp.error = result.data.error;
            }else{
                await mongoose.connect(MONGODB_DSN);
                resp.data.post.comments.push(result.data.key);
                resp = await this.base(resp.data.save());
            }
        }
        return resp;
    }
}