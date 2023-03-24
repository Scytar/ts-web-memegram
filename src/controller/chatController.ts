// Chats
import {Request, Response} from "express";
import {IChatElement , IMessageElement} from "../interfaces";
import iResp from "../interfaces/iResp";
import {getChat, createChat, updateChat, messageChat} from "../services/chatService";
import {genericChatChannel} from "../../server";
import webSocket from 'ws';

const TAG = 'ChatController'

export async function createUpdateChat(req : Request, res : Response) {
    console.log(TAG,'createUpdateChat');
    try {

        const chatData: IChatElement = req.body;
        if (Object.keys(chatData).length === 0) {
            res.status(400).send("Invalid request");
            return;
        } else {
            if (chatData.chatId === '0') {

                const data = await createChat(chatData);
                genericChatChannel.forEach((client : any) => {
                    if (data) {
                        const answer = {
                            type: 'single chat',
                            data: data
                        }
                        client.send(JSON.stringify(answer));
                    };
                });

                res.sendStatus(200);
                return;

            } else {

                const data = await updateChat(chatData);

                genericChatChannel.forEach((client : any) => {
                    if (data) {
                        const answer = {
                            type: 'single chat',
                            data: data
                        }
                        client.send(JSON.stringify(answer));
                    };
                });

                res.status(200).send(data);
                return;
            }
        }
    } catch (error : any) {
        console.log(TAG,'createUpdateChat');
        res.status(500).send(error);
        return;
    }

}

export async function newMessage(req : Request, res : Response) {
    console.log(TAG,'newMessage');
    try {

        const messageData: IMessageElement = req.body;
        if (Object.keys(messageData).length === 0) {
            res.status(400).send("Invalid request");
            return;
        } else {

            const data = await messageChat(messageData);

            genericChatChannel.forEach((client : any) => {
                if (data) {
                    const answer = {
                        type: 'single chat',
                        data: data
                    }
                    client.send(JSON.stringify(answer));
                };
            });

            res.sendStatus(200);
            return;
     
        }
    } catch (error: any) {
        console.log(TAG,'newMessage', error);
        res.status(500).send(error);
        return;
    }

}