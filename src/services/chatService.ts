import iResp from "../interfaces/iResp";
import  MessageRepository from "../repository/messageRepository";
import ChatRepository from "../repository/chatRepository";
import { UserRepository } from "../repository";

async function listAll() {
    try{
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
                const chatMessage: iResp = await msgRep.listBy({messageId: allChats.data[index].messages[msgId]});
                
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

