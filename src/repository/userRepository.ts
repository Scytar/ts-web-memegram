import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
const MONGODB_DSN = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const userSchem = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
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
        let data: any;
        let error: any;
        try {
            await mongoose.connect(MONGODB_DSN);
            const newUser = new userModel({
                _id: new mongoose.Types.ObjectId(),
                user:{
                    name: userData.name,
                    email: userData.email,
                    password: userData.password
                },
                created_at: new Date().toLocaleDateString(),
                updated_at: null,
                deleted_at: null
            });
            const result: any = await newUser.save()
            if(result){
                data = `Usuario ${result.user.name} cadastrado com sucesso!`;
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
            const result: any = await userModel.find();
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
            const result: any = await userModel.find(query);
            if (result) {
                data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            error = err.message;
        }
        return {data, error};
    }
    
    async update(updateData: any){ 
        //Receive an Object with the filter of search(query) and the data to update(content)
        let data: any = null;
        let error: any = null;
        try {
            await mongoose.connect(MONGODB_DSN);
            updateData.content.updated_at = new Date().toLocaleDateString();
            const result: any = await userModel.findOneAndUpdate(
                updateData.query, 
                updateData.content,
                {new: true});
            if (result) {
                data = result;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            error = err.message;
        }
        return {data, error};
    }
    
    async deleteBy(deleteData: any){ 
        //Receive an Object with the filter of search(query) and try delete
        let data: any;
        let error: any;
        try {
            await mongoose.connect(MONGODB_DSN);
            const result: any = await userModel.findOneAndDelete(deleteData.query, {new: true});
            if (result) {
                data = `Usuario ${result.user.name} / ${result.user.email} foi deletado!`;
            }
            await mongoose.connection.close();
        } catch (err: any) {
            error = err.message;
        }
        return {data, error};
    }
}