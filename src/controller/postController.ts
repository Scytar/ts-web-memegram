//newItems
import { Request, Response } from "express";
import { Post } from "../interfaces";
import { newPost } from "../services/postService";
import jwt from 'jsonwebtoken';

const secret: string = 'xfeyi356##$qsWRE';

export async function newItems(req: Request, res: Response) {

    try {

        if (!req.file || req.file.size === 0) {
            res.status(400).send("Please upload a file");
        } else {

            const [, token] = req.headers.authorization!.split(" ");
            const author: any = jwt.verify(token, secret);

            const itemsObject: Post = {
                media: req.file.filename,
                author: author.name,
                authorId: author.id
            };

            // console.log("itemsObject", itemsObject);

            const data = await newPost(itemsObject);
            res.status(202).send(data);
            return;
        }
    } catch (error: any) {
        res.status(500).send(error);
        return;
    }

}