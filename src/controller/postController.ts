//newItems
import { Request, Response } from "express";
import { Post } from "../interfaces";
import { newPost } from "../services/postService";
import jwt from 'jsonwebtoken';

export async function newItems(req: Request, res: Response) {

    try {

        if (!req.file || req.file.size === 0) {
            res.status(400).send("Please upload a file");
        } else {

            const { token } = req.cookies;
            const author: any = jwt.verify(token as string, process.env.SECRET_JWT as string);

            const itemsObject: Post = {
                media: req.file.filename,
                author: author.name,
                authorId: author.id
            };

            const data = await newPost(itemsObject);
            res.status(200).send(data);
            return;
        }
    } catch (error: any) {
        res.status(500).send(error);
        return;
    }

}