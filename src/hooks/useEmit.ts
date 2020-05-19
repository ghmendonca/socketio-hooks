import { useCallback } from "react";
import useNamespace from "./useNamespace";

type BoundEventEmitter = (...args: any[]) => void;

function useEmit(event: string, namespace?: string): BoundEventEmitter {
  const socket = useNamespace(namespace);

  return useCallback((...args: any[]) => socket.emit(event, ...args), [
    socket,
    event
  ]);
}

export default useEmit;
