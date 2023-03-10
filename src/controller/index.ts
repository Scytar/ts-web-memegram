//controller
import { Request, Response } from "express";
import { User } from "../interfaces";
import { selectUser, createUser } from "../services/index";

export async function getLogin(req: Request, res: Response) {

    const userData: User = req.body;
    if (!userData) throw new Error("Requisição de dados inválida!");;

    try {
        const data = await selectUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}

export async function postUser(req: Request, res: Response) {

    const userData: User = req.body;

    if (!userData) throw new Error("Requisição de dados inválida!");

    try {
        const data = await createUser(userData);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }
}


