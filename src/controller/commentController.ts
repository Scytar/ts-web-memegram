//newItems
import { Request, Response } from "express";
import { Comment } from "../interfaces";
import { insertComment, getComment } from "../services/commentService";
import { globalFeedChannel } from "../../server";
import webSocket from 'ws';

export async function newComment(req: Request, res: Response) {

    try {
        // body = { postId: '753314e2-2b78-465e-9815-b773c89f238a',
        //         comment: {
        //            author: 'test',
        //            text: 'test comment'
        //         }
        //     }

        const commentData: Comment = req.body;
        if (Object.keys(commentData).length === 0) {
            res.status(400).send("Invalid request");
            return;
        }
        else {

            const data = await insertComment(commentData);
            if (data?.err) {
                throw new Error(data.err);
            }
            
            globalFeedChannel.forEach((client : any) => {
                if (client.readyState === webSocket.OPEN) {
                    client.send(JSON.stringify(data.feed));
                }
            });

            res.status(200).send(data);
            return;
        }

    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }

}

export async function listComment(req: Request, res: Response) {

    try {
        const postId: string = req.params.postId;
        if (!postId) throw new Error('Invalid request');

        const data = await getComment(postId);
        if (data?.err) {
            throw new Error(data.err);
        }
        res.status(200).send(data);
        return;
    } catch (error: any) {
        res.status(500).send(error.message);
        return;
    }

}