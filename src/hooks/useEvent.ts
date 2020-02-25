import { useEffect, useRef } from 'react';
import useNamespace from './useNamespace';

function useEvent(event: string, namespace: string, callback?: (...args: any[]) => void): void;
function useEvent(event: string, callback: (...args: any[]) => void): void;

function useEvent(
    event: string,
    namespaceOrCallback: string | ((...args: any[]) => void),
    callback?: (...args: any[]) => void,
): void {
    const namespace = typeof namespaceOrCallback === 'string' ? namespaceOrCallback : undefined;
    const callbackFunction = typeof namespaceOrCallback === 'string' ? callback : namespaceOrCallback;

    const callbackRef = useRef(callbackFunction);
    callbackRef.current = callbackFunction;

    const socket = useNamespace(namespace);

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
