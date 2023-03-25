import React from "react"

import {
    Avatar
} from "@vkontakte/vkui"

import "../styles/components/chat.css"

const messages = [

]

export const Chat = () => {
    const renderMessages = messages.map((message, index) => {
        return (
            <div
                key={"message-" + index}
                className={"chat-message-container"}
                style={{ marginBottom: (index + 1 === messages.length) ? 15 : 0 }}
            >
                <div>
                    <Avatar
                        size={43}
                    />
                </div>

                <div className={"chat-message--text-container"}>
                    <div className={"chat-message--text-container--name"}>
                        {message.name}
                    </div>

                    <div className={"chat-message--text-container--text"}>
                        {message.text}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            {
                !messages.length ? (
                    <div className={"chat-messages-empty"}>
                        В чат этой игры ещё никто не писал. Будьте первым!
                    </div>
                ) : (
                    <div className={"chat-messages-container"}>
                        {renderMessages}
                    </div>
                )
            }

            <div className={"chat-input-container"}>

            </div>
        </div>
    )
}