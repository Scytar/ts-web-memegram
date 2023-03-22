//Business rules for user
import { User, NameValidator, PasswordValidator, EmailValidator } from '../interfaces/index'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import iResp from "../interfaces/iResp";
import UserRepository from "../repository/userRepository"

export const createUser = async (data: User) => {
    try {
        //registration data validation
        new EmailValidator(data.email);
        new NameValidator(data.username);
        new PasswordValidator(data.password);

        //password encryption
        const encryptedPasswd: string = await bcrypt.hash(data.password as string, 10);

        const dataUser: User = {
            username: data.username,
            email: data.email,
            password: encryptedPasswd,
        }

        //---------------------------------------------------------------------------
        const userRep = new UserRepository();
        const response: iResp = await userRep.insert({name: dataUser.username, email: dataUser.email, password: dataUser.password});
        //---------------------------------------------------------------------------
        console.log(response)
        if (!response.error) {
            const token = jwt.sign(
                {
                    id: response.data.userId,
                    name: response.data.user.name,
                    email: response.data.user.email
                }, 
                process.env.SECRET_JWT as string,
                { expiresIn: "1d" });
            response.data = {"userId": response.data.userId, "user": response.data.user.name}

            return { response, token };
        } else{
            throw new Error(`${response.error}`);
        }
    }
    catch (err: any) {
        return { err: err.message }
    }

}

export const selectUser = async (data: User) => {
    try {
        new EmailValidator(data.email);
        new PasswordValidator(data.password);

        let emailUser = data.email;
        let password = data.password;
        
        //---------------------------------------------------------------------------
        const userRep = new UserRepository();
        const response: iResp = await userRep.listBy({"user.email": emailUser});
        //---------------------------------------------------------------------------

        if (!response.error) {

           const compare = await bcrypt.compare(password as string, response.data[0].user.password as string)

            if (!compare) throw new Error("Error: Incorrect Password");

            const token = jwt.sign(
                {
                    id: response.data[0].userId,
                    name: response.data[0].user.name,
                    email: data.email
                }, 
                process.env.SECRET_JWT as string,
                { expiresIn: "1d" });
                response.data = {"userId": response.data[0].userId, "user": response.data[0].user.name}

            return { response, token };
        } else{
            throw new Error(`${response.error}`);
        }
    }
    catch (err: any) {
        return { err: err.message }
    }
}