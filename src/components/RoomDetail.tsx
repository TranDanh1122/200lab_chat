import React from "react";
import Avatar from "./Avatar";
import Message from "./Message";
import clsx from "clsx";
interface RoomDetailProps {
    room: Room, inputValue: string;
    setInputValue: (roomid: number , value: string) => void;
}
export default function RoomDetail({ room, inputValue, setInputValue }: RoomDetailProps): React.JSX.Element {
    const [inputState, setInputState] = React.useState<InputType>("init")
    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInputState("type")
        setInputValue(room.id, value);
    }
    const hanleSubmit = () => {
        if ((/^(?!.*(<|>|\bscript\b)).*$/).test(inputValue)) {
            setInputState("submit")
            setInputValue(room.id, "");
        return
        }
        setInputState("error")
    }
    return (
        <div className="w-[70%] mb:w-full relative">
            <div className="sticky w-full h-[10vh] shadow-black shadow-md z-10 bg-black flex items-center gap-6 px-8">
                <Avatar user={room.sender} />
                <span className="font-bold text-white text-[1.25rem]">{room.sender.name}</span>
            </div>
            <div className="flex flex-col gap-5 py-6 justify-end  overflow-y-auto h-[80vh] max-h-[80vh]">
                {room.messages.map(message => <Message key={`${message.content} ${room.id}`} roomID={room.id} sender={room.sender} lastMessage={message} position="detail" />)}
            </div>
            <div className="sticky w-full h-[10vh] z-10">
                <input onChange={(e) => handleOnchange(e)} value={inputValue} className={clsx("w-full px-4 h-full bg-black/70 text-neutral-300 outline-none rounded-3xl", {
                    "border-2 border-solid border-red-500": inputState == "error",
                    "border-none ": inputState != "error"

                })} placeholder="Điền vào chỗ chấm...">
                </input>
                <button disabled={inputState == "init" && !inputValue} onClick={() => hanleSubmit()} className="h-fit p-4 absolute right-0 top-[50%] translate-y-[-50%] bg-black/50 border-solid border-2 border-black/20 text-white rounded-lg  block cursor-pointer"> Send</button>
            </div>
        </div>)
}