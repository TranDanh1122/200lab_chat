import React from "react";
import clsx from "clsx";
export default function Avatar({ user }: { user: User }): React.JSX.Element {
    return (
        <div className="relative">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full object-cover" />
            <span className={clsx("absolute w-3 h-3 top-0 left-0 block rounded-full", {
                "bg-slate-400": !user.isOnline,
                "bg-green-400": user.isOnline
            })} ></span>
        </div>
    )
}