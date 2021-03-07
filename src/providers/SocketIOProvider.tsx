import React from "react";
import { io, Socket, ManagerOptions, SocketOptions } from "socket.io-client";
import SocketIOContext from "../contexts/SocketIOContext";

interface ISockets {
  [key: string]: Socket;
}

// TODO since this is a public facing component it should
// expose PropTypes
interface IProps {
  url: string;
  namespaces?: string[];
  connectionOptions?: Partial<ManagerOptions & SocketOptions>;
  children: React.ReactNode;
}

export default function SocketProvider(props: IProps) {
  const { children, namespaces, url, connectionOptions } = props;

  const sockets: ISockets = {};

  if (namespaces && namespaces.length > 0) {
    for (const namespace of namespaces) {
      const socket = io(
        url.endsWith("/") ? url + namespace : url + `/${namespace}`,
        connectionOptions
      );

      sockets[namespace] = socket;
    }
  } else {
    const socket = io(url, connectionOptions);

    sockets.default = socket;
  }

  return (
    <SocketIOContext.Provider value={sockets}>
      {children}
    </SocketIOContext.Provider>
  );
}
