import { useState } from 'react';
import { useQuery } from 'react-query';

// eslint-disable-next-line
function useWebSocket(_url: string, onOpen?: () => void, onMessage?: () => void) {

    const [socket, setSocket] = useState(null as WebSocket | null);

    const { data, isLoading, error, refetch } = useQuery('webSocket', () => {
        const newSocket = new WebSocket(_url);

        setSocket(newSocket);

        return new Promise((resolve, reject) => {
            // eslint-disable-next-line
            newSocket.onopen = (e: any) => {
                if (onOpen) {
                    onOpen();
                }
                if (e.data) {
                    resolve(JSON.parse(e.data));
                }
            };

            // eslint-disable-next-line
            newSocket.onmessage = (event: any) => {
                if (onMessage) {
                    onMessage();
                }
                resolve(JSON.parse(event.data));
            };

            // eslint-disable-next-line
            newSocket.onerror = (error: any) => {
                reject(error);
            };
        });
    }, {
        enabled: !!socket,
        refetchInterval: false, // Disable automatic refetching
        refetchOnWindowFocus: false, // Disable refetching on window focus
    });

    return { socket, isLoading, data, error, refetch }
}


export { useWebSocket };
