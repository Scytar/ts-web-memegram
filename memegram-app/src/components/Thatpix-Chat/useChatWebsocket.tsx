import React, { useEffect, useState } from 'react'
import { IChatElement } from '../../interfaces/http/chat'

export default function useChatWebsocket() {

    // Scytar ====================================================

    const globalChatSocketUrl = 'ws://localhost:3030/chats';

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
                setWebsocketReceivedState(dataFromSocket?.data);
                break;
            case 'single chat message':
                let temporaryChatData = [ ...websocketReceivedState ];

                for (let index = 0; index < temporaryChatData?.length; index++) {
                    const element: IChatElement = temporaryChatData[index];
                    if (element.chatId == dataFromSocket.data.chatId) {
                        temporaryChatData[index] = dataFromSocket.data;
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
