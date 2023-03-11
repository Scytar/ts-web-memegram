import mongoose from "mongoose";
import * as dotenv from "dotenv";
import {v4 as uuid} from "uuid";
import iResp from "../interfaces/iResp";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const userSchem = new mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    user: {
        name: {
            type: String,
            required: true
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
                key: uuid(),
                user:{
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                },
                created_at: Date.now(),
                updated_at: null,
                deleted_at: null
            });
            const result: any = await newUser.save()
            if(result){
                resp.data = `Usuario ${result.user.name} cadastrado com sucesso!`;
            }
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
            const result: any = await userModel.find();
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
            const result: any = await userModel.find(query);
            if (result) {
                resp.data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
    
    async update(updateData: any){ 
        //Receive an Object with the filter of search(query) and the data to update(content)
        let resp: iResp = {data: null, error: null};
        try {
            await mongoose.connect(MONGODB_DSN);
            updateData.content.updated_at = Date.now();
            const result: any = await userModel.findOneAndUpdate(
                updateData.query, 
                updateData.content,
                {new: true});
            if (result) {
                resp.data = result;
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
            const result: any = await userModel.findOneAndDelete(deleteData.query, {new: true});
            if (result) {
                resp.data = `Usuario ${result.user.name} / ${result.user.email} foi deletado!`;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            resp.error = err.message;
        }
        return resp;
    }
}