//Business rules for user
import { User, NameValidator, PasswordValidator, EmailValidator } from '../interfaces/index'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"
import iResp from "../interfaces/iResp";
import UserRepository from "../repository/userRepository"

const secret: string = 'xfeyi356##$qsWRE';

export const createUser = async (data: User) => {
    try {
        //registration data validation
        new EmailValidator(data.email);
        new NameValidator(data.name);
        new PasswordValidator(data.password);

        //password encryption
        const encryptedPasswd: string = await bcrypt.hash(data.password as string, 10);

        const dataUser: User = {
            name: data.name,
            email: data.email,
            password: encryptedPasswd,
        }

        //acesso ao database do repositories para persistencia dos dados de cadastro
        //---------------------------------------------------------------------------verify
        const userRep = new UserRepository();
        //const response: iResp = await userRep.insert({name:'test', email:'test@teste.com', password:"0000"});
        const response: iResp = await userRep.insert({name: dataUser.name, email: dataUser.email, password: dataUser.password});
        //---------------------------------------------------------------------------verify

        if (!response.error) {
            const token = jwt.sign(
                {
                    id: response.data.userId,
                    name: response.data.user.name,
                    email: response.data.user.email
                }, secret,
                { expiresIn: "1d" });

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
        
        //acessar o database
        //---------------------------------------------------------------------------verify
        const userRep = new UserRepository();
        //const response: iResp = await userRep.listBy({key:"5672b0ff-dcd9-4e29-82d7-bb991d485b3b"}) 
        const response: iResp = await userRep.listBy({"user.email": emailUser});
        //---------------------------------------------------------------------------verify

        //verificar se o response da consulta é válido
        if (!response.error) {

           // comparar password para validação
           const compare = await bcrypt.compare(password as string, response.data[0].user.password as string)

            if (!compare) throw new Error("Error: Incorrect data");

            //password válidado, gerar token
            const token = jwt.sign(
                {
                    id: response.data[0].userId,
                    name: response.data[0].user.name,
                    email: data.email
                }, secret,
                { expiresIn: "1d" });

            return { response, token };
        } else{
            throw new Error(`${response.error}`);
        }
    }
    catch (err: any) {
        return { err: err.message }
    }

}
