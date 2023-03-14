import { Request, Response } from "express";
import { User } from "../interfaces";
import { selectUser, createUser } from "../services/UserService";

export async function login(req: Request, res: Response) {

    const userData: User = req.body;
    if (!userData) throw new Error("Invalid request");

    try {
        const data = await selectUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error);
        return;
    }
}

export async function newUser(req: Request, res: Response) {

    const userData: User = req.body;

    if (!userData) throw new Error("Invalid request");

    try {
        const data = await createUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error);
        return;
    }
}
