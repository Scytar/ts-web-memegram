//Chats
import { Request, Response } from "express";
import { IChatElement } from "../interfaces";
import iResp from "../interfaces/iResp";
import { getChat, createChat, updateChat, messageChat } from "../services/chatService";

export async function createUpdateChat(req: Request, res: Response) {

    try {

        const chatData: IChatElement = req.body;
        if (Object.keys(chatData).length === 0) {
            res.status(400).send("Invalid request");
            return;
        } else {
            if (chatData.chatId === '0') {

                const data = await createChat(chatData);
                res.status(200).send(data);
                return;

            } else {

                const data = await updateChat(chatData);
                res.status(200).send(data);
                return;
            }
        }
    } catch (error: any) {
        res.status(500).send(error);
        return;
    }

}

export async function newMessage(req: Request, res: Response) {

    try {

        const chatData: IChatElement = req.body;
        if (Object.keys(chatData).length === 0) {
            res.status(400).send("Invalid request");
            return;
        } else {

            const data = await messageChat(chatData);
            res.status(200).send(data);
            return;
     
        }
    } catch (error: any) {
        res.status(500).send(error);
        return;
    }

}



