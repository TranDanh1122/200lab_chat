import React from "react";
import Message from "./Message";
export default function ListRoom({ rooms, handleCLick, viewing, inputs }: { rooms: Room[], handleCLick: (id: number) => void, viewing: number, inputs: { [key: number]: string } }): React.JSX.Element {
    const sortedRooms = rooms.sort((a, b) => {
        const hasDraftA = !!inputs[a.id];
        const hasDraftB = !!inputs[b.id];

        if (hasDraftA && !hasDraftB) {
            return -1;
        }
        if (!hasDraftA && hasDraftB) {
            return 1;
        }
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];

        const timeToMinutes = (time: string) => parseInt(time.replace('m', ''));

        const timeA = timeToMinutes(lastMessageA.sendTime);
        const timeB = timeToMinutes(lastMessageB.sendTime);

        return timeA - timeB;

    })

    return (
        <div className="w-[30%] mb:w-full flex gap-6 flex-col">
            {sortedRooms.map(room =>
                <Message key={room.id} roomID={room.id} onCLick={handleCLick} sender={room.sender} lastMessage={
                    inputs[room.id] ? {content: inputs[room.id] , status: "draft" , owner:"" , sendTime: ""} : room.messages[room.messages.length - 1]
                } position="roomlist" viewing={room.id == viewing}
                />)}
        </div>
    )
}