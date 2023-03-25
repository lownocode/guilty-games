import React from "react"

import {
    Avatar
} from "@vkontakte/vkui"
import { Icon28ChatsOutline } from "@vkontakte/icons"

import "../styles/components/chat-bubble.css"

export const ChatBubble = () => {
    return (
        <div className={"chat-bubble-container"}>
            <div className={"chat-bubble-avatar-container"}>
                <Avatar
                    size={42}
                    src={"https://avatars.mds.yandex.net/i?id=ff3338ac878df7cd4149bb2276a1538abf407700-8253870-images-thumbs&n=13"}
                />

                <div className={"chat-bubble-avatar-icon-box"}>
                    <Icon28ChatsOutline
                        style={{
                            width: 16,
                            height: 16,
                            color: "#fff"
                        }}
                    />
                </div>
            </div>

            <div className={"chat-bubble-message-box"}>
                <div className={"chat-bubble-message--name"}>
                    Alexander Localhostov
                </div>

                <div className={"chat-bubble-message--text"}>
                    this is a test text bro, miau
                </div>
            </div>
        </div>
    )
}