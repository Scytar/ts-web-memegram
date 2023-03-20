import React, { useContext, useEffect, useState } from 'react'
import { IChatElement } from '../../interfaces/http/chat'
import { UserContext } from '../../contexts/userInfo';
import { useNotificationContext } from '../../contexts/Notifications/NotificationContext';

export default function useChatWebsocket() {

    // Scytar ====================================================

    const globalChatSocketUrl = 'ws://localhost:3030/chats';

    const UserInfo = useContext(UserContext)

    const { notify } = useNotificationContext()

    // eslint-disable-next-line
    const [websocketReceivedState, setWebsocketReceivedState] = useState(null as any | null)

    // eslint-disable-next-line
    const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        if (websocketReceivedState) {
            // eslint-disable-next-line
            console.log('websocketReceivedState from useEffect', websocketReceivedState)
        }
    }, [websocketReceivedState])


    const [wsEventListenerResponse, setWsEventListenerResponse] = useState(null as any | null)

    useEffect(() => {
        let dataFromSocket;
        if (wsEventListenerResponse) {
            dataFromSocket = JSON.parse(wsEventListenerResponse.data);
        }

        switch (dataFromSocket?.type) {
            case 'global chat':
                let chatsToDisplay: IChatElement[] = [];
                const myUser = {
                    userId: UserInfo.userId as string,
                    username: UserInfo.user as string,
                }

                for (let index = 0; index < dataFromSocket?.data.length; index++) {
                    const element: IChatElement = dataFromSocket?.data[index];
                    for (let i = 0; i < element.participants.length; i++) {
                        const participant = element.participants[i];
                        (participant.userId === UserInfo.userId) ? chatsToDisplay.push(element) : null
                    }
                }
                setWebsocketReceivedState(chatsToDisplay);
                break;
            case 'single chat':
                let temporaryChatData = [...websocketReceivedState];

                let shouldDisplayChat: boolean = false;
                // Check if current user is a participant of received data, if so, add the data to the state

                for (let index = 0; index < dataFromSocket.data.participants.length; index++) {
                    const element = dataFromSocket.data.participants[index];
                    (element.userId === UserInfo.userId) ? shouldDisplayChat = true : null;
                }

                for (let index = 0; index < temporaryChatData?.length; index++) {
                    const element: IChatElement = temporaryChatData[index];
                    if (element.chatId === dataFromSocket.data.chatId) {
                        shouldDisplayChat = false;
                    }


                }

                if (shouldDisplayChat) {
                    temporaryChatData.push(dataFromSocket.data);
                    notify({
                        id: JSON.stringify('chatUpdate' + Date.now() + Math.random()),
                        message: `Você foi adicionado à ${dataFromSocket.data.chatName} 🎉`,
                        type: 'info',
                        duration: 'long',
                    })
                }

                // Update chat that the user isn't added
                for (let index = 0; index < temporaryChatData?.length; index++) {
                    const element: IChatElement = temporaryChatData[index];
                    if (element.chatId == dataFromSocket.data.chatId) {
                        temporaryChatData[index] = dataFromSocket.data;
                    }

                    let shouldKeepChat: boolean = false;
                    // Checks if user is still a participant of the chat
                    for (let i = 0; i < element.participants.length; i++) {
                        const participant = element.participants[i];
                        (participant.userId === UserInfo.userId) ? shouldKeepChat = true : null;
                    }

                    if (!shouldKeepChat) {
                        temporaryChatData.splice(index, 1);
                        notify({
                            id: JSON.stringify('chatUpdate' + Date.now() + Math.random()),
                            message: `Você foi removido de ${element.chatName} 🚨`,
                            type: 'info',
                            duration: 'long',
                        })
                    }
                }

                setWebsocketReceivedState(temporaryChatData);
                break;
            default:
                break;
        }
    }, [wsEventListenerResponse])


    // eslint-disable-next-line
    function handleWebSocketConnection(ws: WebSocket): void {
        // eslint-disable-next-line
        console.log('Chat WebSocket connection established');

        ws.addEventListener('message', function (event: MessageEvent) {
            setWsEventListenerResponse(event);
        });

        ws.addEventListener('close', function () {
            // eslint-disable-next-line
            console.log('Chat WebSocket connection closed');
        });
    }

    useEffect(() => {
        if (!webSocket) {
            const ws = new WebSocket(globalChatSocketUrl);
            setWebSocket(ws);
        } else {
            handleWebSocketConnection(webSocket);
        }

        return (): void => {
            webSocket?.close();
        }
    }, [webSocket]);

    // Scytar ====================================================
    return { websocketReceivedState }
}
