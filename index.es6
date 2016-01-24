import { parse } from "cookie"
import { generate } from "shortid"
import Collectioned from "./lib/collectioned"

class WsSession extends Collectioned {
  constructor (serverUrl) {
    super()
    const cookieObj = parse(document.cookie)
    if (cookieObj.wsSessionId) {
      this.wsSessionId = cookieObj.wsSessionId
    }
    else {
      this.wsSessionId = generate()
      document.cookie = `wsSessionId=${this.wsSessionId};`
    }
    this.webSocket = new WebSocket(serverUrl)
  }
  ready (callback) {
    let handler = () => {
      callback()
      this.webSocket.removeEventListener("open", handler)
    }
    this.webSocket.addEventListener("open", handler)
    return super.add({
      type: 0,
      handler
    })
  }
  once (eventName, callback) {
    let handler = () => {
      callback()
      this.off(id)
    }
    const id = this.on(eventName, handler)
    return id
  }
  on (eventName, callback) {
    function handler (event) {
      const { data: messageJSON } = event
      const message = JSON.parse(messageJSON)
      const { eventName: remoteEventName, data: messageData } = message
      if (eventName === remoteEventName) {
        callback(messageData)
      }
    }
    this.webSocket.addEventListener("message", handler)
    return super.add({
      type: 1,
      handler
    })
  }
  off () {
    Array.prototype.forEach.call(arguments, (id) => {
      if (super.contain(id)) {
        const { type, handler } = super.get(id)
        switch (type) {
          case 0:
            this.webSocket.removeEventListener("open", handler)
            break
          case 1:
            this.webSocket.removeEventListener("message", handler)
            break
        }
        super.remove(id)
      }
    })
  }
  to (eventName, data) {
    const message = {
      eventName: eventName,
      data: data
    }
    const messageJSON = JSON.stringify(message)
    this.webSocket.send(messageJSON)
  }
}

export default WsSession