import { createContext } from 'react';

const SocketContext = createContext<{
    [key: string]: SocketIOClient.Socket;
}>({});

export default SocketContext;
