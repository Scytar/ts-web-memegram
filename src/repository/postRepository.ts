import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const postSchem = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    post: {
        src: {
            type: String,
            required: true,
        },
        id_user: {
            type: mongoose.Types.ObjectId,
            required: true
        }
    },
    created_at: Date
})

const postModel = mongoose.model('post', postSchem);

export default class PostRepository{
    async insert(postData: any){
        //Receive an Object with the data to insert
        let data: any;
        let error: any;
        try {
            await mongoose.connect(MONGODB_DSN);
            const newPost = new postModel({
                _id: new mongoose.Types.ObjectId(),
                post: {
                    src: postData.src,
                    id_user: postData.id_user
                },
                created_at: new Date().toLocaleDateString()
            });
            const result: any = await newPost.save()
            if(result){
                data = `Postagem realizada com sucesso!`;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            error = err.message;
        }
        return {data, error};
    }
    
    async listAll() {
        let data: any;
        let error: any;
        try {
            await mongoose.connect(MONGODB_DSN);
            const result: any = await postModel.find();
            if (result) {
                data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            error = err.message;
        }
        return {data, error};
    }
    
    async listBy(query: any) { 
        //Receive an Object with the filter of search
        let data: any;
        let error: any;
        try {
            await mongoose.connect(MONGODB_DSN);
            const result: any = await postModel.find(query);
            if (result) {
                data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            error = err.message;
        }
        return {data, error};
    }
}