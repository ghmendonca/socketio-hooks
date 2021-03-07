import { createContext } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext<{
  [key: string]: Socket;
}>({});

export default SocketContext;
