declare global {
    interface User {
        name: string,
        avatar: string,
        isOnline: boolean,
    }
    type InputType = "type" | "submit" | "error" | "init"

    type MessageStatus = | "draft" | "sending" | "send" | "received"
    interface Message {
        owner: string,
        content: string,
        sendTime: string,
        status: MessageStatus

    }
    interface Room {
        id: number,
        sender: User,
        messages: Message[]
        lastTime: string
    }
}
export { }