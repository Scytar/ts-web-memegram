import { Request, Response } from "express";
import { getFeed } from '../services/feedService'

export async function feed(req: Request, res: Response) {
    try {
        const data = await getFeed();
        res.status(200).send(data);        
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }
}