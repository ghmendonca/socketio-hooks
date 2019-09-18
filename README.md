# SocketIO Hooks

## What is it

socketio-hooks is a library which provides a bunch of React Hooks to easily connect and manage SocketIO.

## Installation

You can get the latest release using npm:

```batch
$ npm install --save socketio-hooks
```

## Example

In order to be able to use the hooks, you first have to render the Provider somewhere before your component and pass the connection options, like:

```typescript
import React from 'react'
import { SocketIOProvider } from 'socketio-hooks'

const Providers: React.FunctionComponent<{}> = ({ children }) => {
    return (
        <SocketIOProvider url="http://localhost:8080/" namespaces={['feed', 'chat']} connectionOptions={{ query: { hello: 'world' } }}>
            ...
            { children }
            ...
        </SocketIOProvider>
    )
}
```

And then in your component, you can import any hook like this:

```typescript
import React, { useState } from 'react'
import { useSocket } from 'socketio-hooks'

const Feed: React.FunctionComponent<{}> = ({}) => {
    const [tweets, setTweets] = useState([])

    const socket = useSocket('new.tweet', 'feed', (tweet) => {
        setTweets(tweets => [...tweets, tweet])
    })

    // You can also have multiple events registered
    useSocket('new.message', 'chat', (message) => {
        console.log(`Someone sent me this message: ${message}`)
    })

    const sendTweet = () => {
        socket.emit('send.tweet', 'Sending a tweet is so easy')
    }

    return (
        <>
            <ul>
                {
                    tweets.map(tweet => <li>{ tweet }</li>)
                }
            </ul>
            <button onClick={() => sendTweet()}>Send a Tweet</button>
        </>
    )
}
```

## API

### SocketIOProvider

|Prop|Required|Default|Type|Description|
| ---- | ---- | ---- | ---- | ---- |
| url | true |  | string | Url used to connect to the server |
| namespaces | false | [] | string[] | Namespaces to connect. If no one provided, the only namespace available will be the default ("/") |
| connectionOptions | false | undefined | [SocketIOClient.ConnectOpts](https://socket.io/docs/client-api/) | Object with options to be passed when connecting to SocketIO |

### useSocket()

Parameters
 - event | String - Required. Event which the socket will listen to.
 - namespace | String - Optional. Namespace which the event will listen.
 - callback | Function - Required. Function that will be called once the event is triggered.