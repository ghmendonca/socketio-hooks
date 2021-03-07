import { useContext } from "react";
import { Socket } from "socket.io-client";
import SocketContext from "../contexts/SocketIOContext";

function useNamespace(namespace?: string): Socket {
  const sockets = useContext(SocketContext);

  let socket: Socket;

  if (namespace) {
    socket = sockets[namespace];
  } else {
    socket = sockets.default;
  }

  if (!socket) {
    throw new Error(`The namespace provided is not valid (${namespace})`);
  }

  return socket;
}

export default useNamespace;
