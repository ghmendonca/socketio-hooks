import SocketIOContext from "../contexts/SocketIOContext";
import React from "react";
import io from "socket.io-client";

interface ISockets {
  [key: string]: SocketIOClient.Socket;
}

// TODO since this is a public facing component it should
// expose PropTypes
interface IProps {
  url: string;
  namespaces?: string[];
  connectionOptions?: SocketIOClient.ConnectOpts;
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
