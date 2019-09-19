import { useContext } from 'react';
import SocketContext from '../contexts/SocketIOContext';

function useEmit(event: string, namespace?: string): (...args: any[]) => void {
    const sockets = useContext(SocketContext);

    let socket: SocketIOClient.Socket;

    if (namespace) {
        socket = sockets[namespace];

        if (!socket) {
            throw new Error(`The namespace provided is not valid (${namespace})`);
        }
    } else {
        socket = sockets.default;
    }

    return (...args: any[]) => {
        socket.emit(event, ...args);
    };
}

export default useEmit;
