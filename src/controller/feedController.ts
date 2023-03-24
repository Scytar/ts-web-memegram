import { Request, Response } from "express";
import { getFeed } from '../services/feedService'

const TAG = 'feedController';

export async function feed(req: Request, res: Response) {
    try {
        console.log(TAG,'feed');
        const data = await getFeed();
        res.status(200).send(data);        
        return;
    } catch (error: any) {
        console.log(TAG,'feed', error);
        res.status(500).send(error.message);
        return;
    }
}