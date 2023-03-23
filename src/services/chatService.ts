import iResp from "../interfaces/iResp";
import MessageRepository from "../repository/messageRepository";
import ChatRepository from "../repository/chatRepository";
import { UserRepository } from "../repository";
import { IChatElement } from "../interfaces";

async function listAll() {
    try {
        const chatRep = new ChatRepository();
        const response: iResp = await chatRep.listAll();
        if (!response.error) {
            return response;
        }
    } catch (err: any) {
        return { err: err.message }
    }
}

export async function getChat() {
    try {
        let messages = [];
        const msgRep = new MessageRepository();
        const allChats: any = await listAll();

        for (let index = 0; index < allChats.data.length; index++) {
            for (let msgId = 0; msgId < allChats.data[index].messages.length; msgId++) {
                const chatMessage: iResp = await msgRep.listBy({ messageId: allChats.data[index].messages[msgId] });

                if (!chatMessage.error) {
                    messages.push(chatMessage.data[0]);
                }
            }
            allChats.data[index].messages = messages;
            messages = [];
        }
        return allChats;
    } catch (err: any) {
        return { err: err.message }
    }
}


export async function messageChat(dataChat: IChatElement) {
    // try {
    //     let messages = [];
    //     const msgRep = new MessageRepository();
    //     const allChats: any = await listAll();

    //     for (let index = 0; index < allChats.data.length; index++) {
    //         for (let msgId = 0; msgId < allChats.data[index].messages.length; msgId++) {
    //             const chatMessage: iResp = await msgRep.listBy({ messageId: allChats.data[index].messages[msgId] });

    //             if (!chatMessage.error) {
    //                 messages.push(chatMessage.data[0]);
    //             }
    //         }
    //         allChats.data[index].messages = messages;
    //         messages = [];
    //     }
    //     return allChats;
    // } catch (err: any) {
    //     return { err: err.message }
    // }
}


export async function createChat(dataChat: IChatElement) {

    try {

        let participants = [];

        const chatRep = new ChatRepository();
        const respChat: iResp = await chatRep.insert({ chatName: dataChat.chatName, owner: dataChat.chatRoles.owner });

        if (!respChat.error) {

            for (let index = 0; index < dataChat.participants.length; index++) {

                const respPart: iResp = await chatRep.addPart({ chatId: respChat.data[0].chatId, username: dataChat.participants[index].username });
                if (!respPart.error) {
                    participants.push(respPart.data[0]);
                }
            }
            respChat.data[0].participants.push(participants);
            return respChat;
        }

    } catch (err: any) {
        return { err: err.message }
    }
}


export async function updateChat(dataChat: IChatElement) {

    try {

        let participants = [];

        const chatRep = new ChatRepository();
        const respChat: iResp = await chatRep.listBy({ chatId: dataChat.chatName })

        if (!respChat.error) {

            if (respChat.data[0].chatRoles.owner == dataChat.chatRoles.owner) {
                for (let index = 0; index < dataChat.participants.length; index++) {

                    const respPart: iResp = await chatRep.addPart({ chatId: respChat.data[0].chatId, username: dataChat.participants[index].username });
                    if (!respPart.error) {
                        participants.push(respPart.data[0]);
                    }
                }
                respChat.data[0].participants.push(participants);
                return respChat;
            } else {
                throw new Error(`The participant is not the group owner`);
            }
        }

    } catch (err: any) {
        return { err: err.message }
    }
}