import React, { useState } from "react"

import {
    Panel,
    SimpleCell,
    HorizontalScroll,
} from "@vkontakte/vkui"
import { back } from "@itznevikat/router"

import "../../styles/games/wheel.css"
import { BackButton, Chat } from "../../components"
import { config } from "../../data"
import { platform } from "../../functions"

const h = [
    {
        number: 0,
    },
    {
        number: 2,
        hash: "test",
        salt: "test"
    },
    {
        number: 33,
        hash: "test",
        salt: "test"
    }
]

export const WheelGame = ({ nav }) => {
    const [ history, setHistory ] = useState(h)

    const renderHistory = history.map((item, index) => {
        const color =
            item.number === 0 ? "green" :
            config.games.wheelColors.red.includes(item.number) ? "red" : "black"

        return (
            <div>
                <div
                    className={"wheel-history-number"}
                    style={{
                        background: `var(--wheel-${color})`,
                        marginRight: index + 1 === history.length ? 0 : 7,
                    }}
                >
                    {item.number}
                </div>
            </div>
        )
    })

    return (
        <Panel id={nav}>
            <SimpleCell
                before={<BackButton onClick={() => back()}/>}
                disabled
                subtitle={`Онлайн: 0`}
                style={{ padding: 0 }}
            >
                Wheel
            </SimpleCell>

            <div style={{ width: platform.isDesktop() ? "62%" : "auto" }}>
                <div className={"wheel-history-container"}>
                    <div className={"wheel-history-container--head"}>
                        История игр
                    </div>

                    <HorizontalScroll>
                        <div style={{ display: "flex" }}>
                            {renderHistory}
                        </div>
                    </HorizontalScroll>
                </div>
            </div>

            {
                platform.isDesktop() && (
                    <div className={"wheel-chat-box"}>
                        <Chat />
                    </div>
                )
            }
        </Panel>
    )
}