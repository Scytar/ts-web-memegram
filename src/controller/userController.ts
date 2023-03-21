import { Request, Response } from "express";
import { User } from "../interfaces";
import { selectUser, createUser } from "../services/UserService";

export async function login(req: Request, res: Response) {

    const userData: User = req.body;
    if (!userData) throw new Error("Invalid request");

    try {
        const data = await selectUser(userData);
        if (data?.err) {
            throw new Error(data.err);
        }
        res.cookie('token', data.token, { httpOnly: true, maxAge: 86400000, secure: false })
        res.status(202).send(data.response);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}

export async function newUser(req: Request, res: Response) {

    const userData: User = req.body;

    if (!userData) throw new Error("Invalid request");

    try {
        const data = await createUser(userData);
        if (data?.err) {
            throw new Error(data.err);
        }
        res.cookie('token', data.token, { httpOnly: true, maxAge: 86400000, secure: false })
        res.status(202).send(data.response);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}

export async function logout(req: Request, res: Response) {
    try {
        res.clearCookie('token', { httpOnly: true}).status(200).send('Cookie cleared');
    } catch (error) {
        console.log('Error clearing cookies from', req.ip, ":", error);
        res.sendStatus(500);
    }
}
