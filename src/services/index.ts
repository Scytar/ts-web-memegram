//Regras de negócio
import { User, NameValidator, PasswordValidator, EmailValidator } from '../interfaces/index'
import * as dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid"

const secret: string = '222334';

export const createUser = async (data: User) => {
    try {
        //validação dos dados de cadastro
        new EmailValidator(data.email);
        new NameValidator(data.username);
        new PasswordValidator(data.password);

        //criptografia do password
        const encryptedPasswd: string = await bcrypt.hash(data.password as string, 10);

        const dataUser: User = {
            id: uuid(),
            username: data.username,
            email: data.email,
            password: encryptedPasswd,
        }

        //acesso ao database do repositories para persistencia dos dados de cadastro

        // if (!response.error) {
        //     return response.data;
        // }

    }
    catch (err: any) {
        return { err: err }
    }

}

export const selectUser = async (data: User) => {
    try {
        new EmailValidator(data.email);
        new PasswordValidator(data.password);

        let emailUser = data.email;
        let password = data.password;
        
        //acessar o database para getEmail

        //verificar se o response da consulta é válido
        //if (!response.err) {

            //comparar password para validação
           // const compare = await bcrypt.compare(password as string, user.password as string)

            //if (!compare) throw new Error("Password incorreto!");

            //password válidado, gerar token
            // const token = jwt.sign(
            //     {
            //         id: user.id,
            //         email: user.email
            //     }, secret,
            //     { expiresIn: "1d" });

            // return { user, token };
       // }
    }
    catch (err: any) {
        return { err: err }
    }

}
