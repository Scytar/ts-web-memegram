// newItems
import {Request, Response} from "express";
import {Like} from "../interfaces";
import {insertLike} from "../services/likeService";
import { globalFeedChannel } from "../../server";
import webSocket from 'ws';

const TAG = 'likeController';

export async function newLike(req : Request, res : Response) {
    console.log(TAG,'newLike')
    try {
        // body = {
        //     postId: '753314e2-2b78-465e-9815-b773c89f238a',
        //     userId: '89311d70-69c9-4899-8fca-537f9a272c4a'
        // }

        const likeData: Like = req.body;
        if (Object.keys(likeData).length === 0) {
            res.status(400).send("Invalid request");
            return;
        } else {

            const data = await insertLike(likeData); // Todo o feed
            if (data ?. err) {
                throw new Error(data.err);
            }

            globalFeedChannel.forEach((client : any) => {
                if (client.readyState === webSocket.OPEN) {
                    if (data) {
                      client.send(JSON.stringify(data.feed));
                    };
                  }
            });

            res.sendStatus(200);
            return;
        }

    } catch (error : any) {
        console.log(TAG,'newLike')
        res.status(500).send(error.message);
        return;
    }

}
