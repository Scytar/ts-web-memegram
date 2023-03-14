//newItems
import { Request, Response } from "express";
import { Post } from "../interfaces";
import { newPost } from "../services/postService";

export async function newItems(req: Request, res: Response) {

    const itemsObject: Post = req.body;
    if (!itemsObject) throw new Error("Invalid request");

    if (!req.file || req.file.size === 0) {
        res.status(400).send("Please upload a file");
    } else {
        itemsObject.media = req.file.filename;
    }
 
    try {
        const data = await newPost(itemsObject);
        res.status(202).send(data);
        return;
    } catch (error: any) {
        res.status(error.status).send(error.message);
        return;
    }

}