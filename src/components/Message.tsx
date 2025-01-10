import clsx from "clsx";
import React from "react";
import Avatar from "./Avatar";
export default function Message({ roomID, sender, lastMessage, viewing, onCLick, position }: { roomID: number, sender: User, lastMessage: Message, position: "roomlist" | "detail", viewing?: boolean, onCLick?: (id: number) => void, }): React.JSX.Element {
    return (
        <div onClick={() => onCLick?.(roomID)} className={clsx("flex items-center justify-start gap-6 rounded-3xl px-4 py-2 cursor-pointer", {
            "bg-[#323232]": !viewing,
            "bg-[#424242]": viewing
        })}>
            <Avatar user={lastMessage.owner == "" && position != "roomlist" ? { isOnline: true, name: "You", avatar: "./assets/images/you.png" } : sender} />
            <div className="flex flex-col items-start justify-between gap-2 w-full">
                <div className="flex items-center justify-start gap-4 w-full">
                    <h2 className="font-bold text-[1.25rem] text-white">{lastMessage.owner == ""&& position != "roomlist" ? "You" : sender.name}</h2>
                    <span className="text-neutral-400 block">{lastMessage.sendTime}</span>
                    <span className={clsx("w-2 h-2 bg-green-400 rounded-full ml-auto", {
                        "hidden": lastMessage.status == "received" || position == "detail",
                        "block": lastMessage.status != "received" && position != "detail",
                    })}></span>
                </div>
                <p className={clsx("text-white  overflow-hidden", {
                    "text-ellipsis text-nowrap": position == "roomlist"
                })}>{lastMessage.status == "draft" && "Draft: "} {lastMessage.content}</p>
            </div>
        </div>
    )
}