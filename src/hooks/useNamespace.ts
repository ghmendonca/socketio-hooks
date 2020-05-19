import { useContext } from "react";
import SocketContext from "../contexts/SocketIOContext";

function useNamespace(namespace?: string): SocketIOClient.Socket {
  const sockets = useContext(SocketContext);

  let socket: SocketIOClient.Socket;

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
