import iResp from "../interfaces/iResp";
import MessageRepository from "../repository/messageRepository";
import ChatRepository from "../repository/chatRepository";
import {UserRepository} from "../repository";
import {IChatElement, IMessageElement} from "../interfaces";

const TAG = 'ChatService'

async function listAll() {
    console.log(TAG,'listAll');
    try {
        const chatRep = new ChatRepository();
        const response: iResp = await chatRep.listAll();
        if (! response.error) {
            return response;
        }
    } catch (err : any) {
        console.log(TAG,'listAll');
        throw err.message;
    }
}

export async function getChat() {
    console.log(TAG,'getChat');
    try {
        let messages = [];
        const msgRep = new MessageRepository();
        const allChats: any = await listAll();

        for (let index = 0; index < allChats.data.length; index++) {
            for (let msgId = 0; msgId < allChats.data[index].messages.length; msgId++) {
                const chatMessage: iResp = await msgRep.listBy({messageId: allChats.data[index].messages[msgId]});

                if (! chatMessage.error) {
                    const msgObj = {
                        messageId: chatMessage.data[0].messageId,
                        username: chatMessage.data[0].username,
                        ddateWithTime: chatMessage.data[0].created_at,
                        message: chatMessage.data[0].text
                    }
                    messages.push(msgObj);
                }
            }
            allChats.data[index].messages = messages;
            messages = [];
        }
        return allChats;
    } catch (err : any) {
        console.log(TAG,'getChat');
        return {err: err.message}
    }
}


export async function messageChat(dataMessage: IMessageElement) {
    console.log(TAG,'createmessageChatChat');
    try{
        //---------------------------------------------------------------------------
        const chatRep = new ChatRepository();
        const response = await chatRep.msgSend(dataMessage);
        //---------------------------------------------------------------------------

        if (!response.error) {
            return getChat();
        } else {
            throw new Error(`${response.error}`);
        }
    }
    catch (err: any) {
        console.log(TAG,'messageChat');
        return { err: err.message }
    }
}

export async function createChat(dataChat : IChatElement) {
    console.log(TAG,'createChat');

    try {
        let participants = [];

        const chatRep = new ChatRepository();
        const respChat: iResp = await chatRep.insert({chatName: dataChat.chatName, owner: dataChat.chatRoles.owner});

        if (! respChat.error) {

            for (let index = 0; index < dataChat.participants.length; index++) {
                const respPart: iResp = await chatRep.addPart({chatId: respChat.data.chatId, username: dataChat.participants[index].username});

                if (index == dataChat.participants.length - 1) {
                    participants = respPart.data.participants;
                }

            }
            respChat.data.participants = (participants);

            const chatElementToRespond = {
                chadId: respChat.data.chatId,
                chatName: respChat.data.chatName,
                chatRoles: {
                    owner: respChat.data.chatRoles.owner
                },
                participants: respChat.data.participants,
                messages: []
            }

            return chatElementToRespond;
        }

    } catch (err : any) {
        console.log(TAG,'createChat');
        return {err: err.message}
    }
}

export async function updateChat(dataChat : IChatElement) {
    console.log(TAG,'updateChat');

    try {
        let participants = [];

        const chatRep = new ChatRepository();
        const respChat: iResp = await chatRep.listBy({chatName: dataChat.chatName})

        if (! respChat.error) {
            if (respChat.data.chatRoles.owner == dataChat.chatRoles.owner) {
                respChat.data.participant = [];
                for (let index = 0; index < dataChat.participants.length; index++) {
                    const respPart: iResp = await chatRep.addPart({chatId: respChat.data.chatId, username: dataChat.participants[index].username});
                    if (index == dataChat.participants.length - 1) {
                        participants = respPart.data.participants;
                    }
    
                }
                respChat.data.participants = (participants);

                const chatElementToRespond = {
                    chadId: respChat.data.chatId,
                    chatName: respChat.data.chatName,
                    chatRoles: {
                        owner: respChat.data.chatRoles.owner
                    },
                    participants: respChat.data.participants,
                    messages: []
                }
    
                return chatElementToRespond;
            } else {
                throw new Error(`The participant is not the group owner`);
            }
        }

    } catch (err : any) {
        console.log(TAG,'updateChat');
        return {err: err.message}
    }
}