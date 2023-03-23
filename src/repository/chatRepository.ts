import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";
import MessageRepository from "./messageRepository";
import UserRepository from "./userRepository";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const chatSchem = new mongoose.Schema({
    chatId: {
        type: String,
        unique: true
    },
    chatName: {
        type: String,
        required: true
    },
    chatRoles:{
        owner:{
            type: String,
            required: true
        }
    },
    participants:{
        type: Array<String>
    },
    messages:{
        type: Array<any>,
    },
    created_at: Date
})

const chatModel = mongoose.model('chat', chatSchem);

export default class ChatRepository{

    async insert(chatData: any){
        //Receive an Object with the data to insert
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const newChat = new chatModel({
                chatId: uuid(),
                chatName: chatData.chatName,
                chatRoles: {
                    owner: chatData.owner
                },
                participants: [],
                messages: [],
                created_at: Date.now()
            });
            resp.data = await newChat.save();
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
            resp.data = await chatModel.find();
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
            resp.data = await chatModel.find(query);
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }

    async addPart(chatData: any){
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            resp.data = await chatModel.findOne(
                {chatId: chatData.chatId}
            );
            if (resp.data) {
                const userRep = new UserRepository();
                const result = await userRep.listBy({'user.name': chatData.username});
                if (!result.data) {
                    resp.error = result.error;
                    return resp;
                }else{
                    resp.data.participants.push({ userId: result.data[0].userId, username: result.data[0].user.name});
                    await mongoose.connect(MONGODB_DSN);
                    resp.data = await resp.data.save();     
                }
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }

    async msgSend(msgData: any){
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            resp.data = await chatModel.findOne(
                {chatId: msgData.chatId}
            );
            if (resp.data) {
                const msgRep = new MessageRepository();
                const result = await msgRep.insert(msgData.message);
                if (!result.data) {
                    resp.error = result.error;
                    return resp;
                }else{
                    resp.data.messages.push(result.data.messageId);
                    await mongoose.connect(MONGODB_DSN);
                    resp.data = await resp.data.save();     
                }
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
}