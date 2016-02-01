# ws-session

## Donate: 5300 7211 1281 6316

## It used with [ws-sessions](https://www.npmjs.com/package/ws-sessions) on the server.

## *This is more than communication with a single socket.*

## Installation

```bash
$ npm install ws-session
```

## Example

```js
import session from "ws-session"

const { connected, send, subscribe } = session("ws://localhost:5000")

connected(() => {
  send("greeting.request", "hi")
})

sibscribe("greeting.response", (data) => {
  send("present.request", "I'm a node.js developer.")
})
```

## Usage

First you need to connect to the server:

#### connect(url)

```js
const { connected, send, subscribe, subscribeOnce, sessionId, webSocket } = connect("ws://localhost:5000")
```

Returns ease functionality for working with the connection.

## API

#### connected(callback)

```js
const unsubscribe = connected(() => {
  // ...
})
```

The callback function is invoked when a connection is ready. Returns function to unsubscribe.

It is necessary, if you want to make a request to the server once a connection is works:

```js
connected(() => {
  send("user.check", { id, token })
})
```

#### send(event, data [, data ...])

Send data to the server.

```js
send("user.update", user)
```

#### subscribe(event, callback)

```js
const unsubscribe = subscribe("user.updated", (user) => {
  // ...
})
```

Used for receiving data from the server. Returns function to unsubscribe.

#### subscribeOnce(event, callback)

The same, but unsubscribe after receive data. Returns function to unsubscribe.

```js
const unsubscribe = subscribeOnce("settings.default-language", (language) => {
  // ...
})
```

#### sessionId

Id of the current session, which is used on the server.

#### webSocket

Pure browser Web Socket instance used in the current connection. Use if you want to do something more.