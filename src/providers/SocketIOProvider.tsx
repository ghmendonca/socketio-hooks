import SocketIOContext from '../contexts/SocketIOContext'
import React from 'react'
import io from 'socket.io-client'

const SocketProvider: React.FunctionComponent<{
    url: string
    namespaces?: string[]
}> = ({ children, namespaces, url }) => {
    const sockets: { [key: string]: SocketIOClient.Socket } = {}

    if (namespaces && namespaces.length > 0) {
        for (const namespace of namespaces) {
            const socket = io(url.endsWith('/') ? url + namespace : url + `/${namespace}`)

            sockets[namespace] = socket
        }
    } else {
        const socket = io(url)

        sockets.default = socket
    }

    return (
        <SocketIOContext.Provider value={sockets}>
            {children}
        </SocketIOContext.Provider>
    )
}

export default SocketProvider