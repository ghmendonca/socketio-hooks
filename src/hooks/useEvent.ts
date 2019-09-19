import { useContext, useEffect, useRef } from 'react';
import SocketContext from '../contexts/SocketIOContext';

function useEvent(event: string, namespace: string, callback?: (...args: any[]) => void): void;
function useEvent(event: string, callback: (...args: any[]) => void): void;

function useEvent(
    event: string,
    namespaceOrCallback: string | ((...args: any[]) => void),
    callback?: (...args: any[]) => void,
): void {
    const namespace = typeof namespaceOrCallback === 'string' ? namespaceOrCallback : null;
    const callbackFunction = typeof namespaceOrCallback === 'string' ? callback : namespaceOrCallback;

    const sockets = useContext(SocketContext);

    const callbackRef = useRef(callbackFunction);
    callbackRef.current = callbackFunction;

    let socket: SocketIOClient.Socket;

    if (namespace) {
        socket = sockets[namespace];

        if (!socket) {
            throw new Error(`The namespace provided is not valid (${namespace})`);
        }
    } else {
        socket = sockets.default;
    }

    useEffect(() => {
        function socketHandler(this: SocketIOClient.Socket, ...args: any[]) {
            if (callbackRef.current) {
                callbackRef.current.apply(this, args);
            }
        }

        if (event) {
            socket.on(event, socketHandler);

            return () => {
                socket.removeListener(event, socketHandler);
            };
        }
    }, [event]);
}

export default useEvent;
