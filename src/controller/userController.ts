import { Request, Response } from "express";
import { User } from "../interfaces";
import { selectUser, createUser } from "../services/UserService";
import jwt from 'jsonwebtoken';

const TAG = 'userController';

export async function login(req: Request, res: Response) {
    console.log(TAG,'login')
    const userData: User = req.body;

    try {

        const { token } = req.cookies;

        if (token) {
            const check: any = jwt.verify(token as string, process.env.SECRET_JWT as string);
            if (check) {
                res.cookie('token', token, { httpOnly: true, maxAge: 86400000, secure: false })
                res.status(200).send({ userInfo: { user: check.name, userId: check.id } });
                return
            }
        }

        if (!userData) return res.sendStatus(400);
        const data = await selectUser(userData);
        if (data?.err) {
            throw new Error(data.err);
        }
        res.cookie('token', data.token, { httpOnly: true, maxAge: 86400000, secure: false })
        res.status(200).send(data.response);
        return;
    } catch (error: any) {
        console.log(TAG,'login');
        res.status(500).send(error.message);
        return;
    }
}

export async function newUser(req: Request, res: Response) {
    console.log(TAG,'newUser');

    const userData: User = req.body;

    if (!userData) throw new Error("Invalid request");

    try {
        const data = await createUser(userData);
        if (data?.err) {
            throw new Error(data.err);
        }
        res.cookie('token', data.token, { httpOnly: true, maxAge: 86400000, secure: false })
        res.status(200).send(data.response);
        return;
    } catch (error: any) {
        console.log(TAG,'newUser');
        res.status(500).send(error.message);
        return;
    }
}

export async function logout(req: Request, res: Response) {
    console.log(TAG,'logout');
    try {
        res.clearCookie('token', { httpOnly: true }).status(200).send('Cookie cleared');
    } catch (error) {
        console.log(TAG,'logout');
        console.log('Error clearing cookies from', req.ip, ":", error);
        res.sendStatus(500);
    }
}
