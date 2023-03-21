import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const userSchem = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    user: {
        name: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
    },
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
})

const userModel = mongoose.model('user', userSchem);

export default class UserRepository{

    async insert(userData: any){
        //Receive an Object with the data to insert
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            const newUser = new userModel({
                userId: uuid(),
                user:{
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                },
                created_at: Date.now(),
                updated_at: null,
                deleted_at: null
            });
            resp.data = await newUser.save();
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
                resp.data = await userModel.find();
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
            resp.data = await userModel.find(query);
            if (!resp.data) {
            resp.error = "Error: not found" 
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
    
    async update(updateData: any){
        //Receive an Object with the query to search the document and the data to update
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            updateData.content.updated_at = Date.now();
            resp.data = await userModel.findOneAndUpdate(
                updateData.query, 
                updateData.content,
                {new: true}
            );
            if (!resp.data) {
                resp.error = "Error: not found";
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
    
    async deleteBy(deleteData: any){ 
        //Receive an Object with the filter of search(query) and try delete
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            resp.data = await userModel.findOneAndDelete(
                deleteData.query, {new: true}
            );
            if (resp.data) {
                resp.data = `Usuario ${resp.data.user.name} / ${resp.data.user.email} foi deletado!`;
            } else{
                resp.error = "Error: not found";
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
}