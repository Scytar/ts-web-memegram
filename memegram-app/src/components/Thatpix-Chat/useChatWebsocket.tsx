import React,{useEffect, useState} from 'react'

export default function useChatWebsocket() {

    // Scytar ====================================================

  const globalChatSocketUrl = 'ws://127.0.0.1:3030/chats';

  // eslint-disable-next-line
  const [websocketReceivedState, setWebsocketReceivedState] = useState(null as any | null)

  // eslint-disable-next-line
  const [webSocket, setWebSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
      if (websocketReceivedState) {
          // eslint-disable-next-line
          console.log('websocketReceivedState', websocketReceivedState)
      }
  }, [websocketReceivedState])

  // eslint-disable-next-line
  function handleWebSocketConnection(ws: WebSocket): void {
      // eslint-disable-next-line
      console.log('Chat WebSocket connection established');

      ws.addEventListener('message', function (event: MessageEvent) {
          //TODO: refactor ws.message response to only send a specific chat data, not all the chats.
          setWebsocketReceivedState(JSON.parse(event.data));

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
