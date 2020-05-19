import { useEffect, useRef } from "react";
import useNamespace from "./useNamespace";

function useSocket(
  event: string,
  namespace: string,
  callback?: (...args: any[]) => void
): SocketIOClient.Socket;
function useSocket(
  event: string,
  callback: (...args: any[]) => void
): SocketIOClient.Socket;

function useSocket(
  event: string,
  namespaceOrCallback: string | ((...args: any[]) => void),
  callback?: (...args: any[]) => void
): SocketIOClient.Socket {
  const namespace =
    typeof namespaceOrCallback === "string" ? namespaceOrCallback : undefined;
  const callbackFunction =
    typeof namespaceOrCallback === "string" ? callback : namespaceOrCallback;

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

  return socket;
}

export default useSocket;
