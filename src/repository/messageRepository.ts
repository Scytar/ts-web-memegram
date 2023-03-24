import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const messageSchem = new mongoose.Schema({
    messageId: {
        type: String,
        unique: true
    },
    chatId:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created_at: Date
})

const messageModel = mongoose.model('message', messageSchem);

export default class MessageRepository{

    async insert(messageData: any){
        //Receive an Object with the data to insert
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const newMessage = new messageModel({
                messageId: uuid(),
                chatId: messageData.chatId,
                username: messageData.username,
                text: messageData.text,
                created_at: Date.now()
            });
            resp.data = await newMessage.save();
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }

    async listBy(query: any) { 
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            resp.data = await messageModel.find(query);
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
}