class Socket {
    constructor() {
        this.socket = null
    }

    connect(url) {
        if (!this.socket) {
            this.socket = new WebSocket(url)

        }
    }

    isConnected() {
        if (this.socket) {
            return this.socket.readyState === WebSocket.OPEN
        }
        return false
    }

    disconnect() {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
    }

    send(message) {
        if (this.socket) {
            this.socket.send(JSON.stringify(message))
        }
    }

    on(eventName, callback) {
        if (this.socket) {
            this.socket.addEventListener(eventName, callback)
        }
    }
}

export default Socket