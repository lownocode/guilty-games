import React, { useEffect, useState } from "react"
import { back, push } from "@itznevikat/router"
import useWebSocket from "react-use-websocket"

import {
    Panel,
    SimpleCell,
    HorizontalScroll,
} from "@vkontakte/vkui"

import "../../styles/games/wheel.css"
import { BackButton, BettingBlock, Chat, ChatBubble } from "../../components"
import { config } from "../../data"
import { platform } from "../../functions"
import { getReadingStatus } from "../../websocket/helpers"
import { useDispatch } from "react-redux"
import { setLoading } from "../../redux/reducers"

export const WheelGame = ({ nav }) => {
    const dispatch = useDispatch()

    const [ history, setHistory ] = useState([])
    const { readyState, lastJsonMessage } = useWebSocket(`${config.wsUrl}/game/wheel`, {
        queryParams: {
            "vk-params": encodeURIComponent(window.vkParams)
        }
    })

    useEffect(() => {
        dispatch(setLoading(true))
    }, [])

    const handleSocketConnection = status => {
        switch (status) {
            case "open": {
                return dispatch(setLoading(false))
            }
        }
    }

    const handleSocketMessage = () => {
        if (!lastJsonMessage) return

        switch (lastJsonMessage.type) {
            case "INIT": {
                setHistory(lastJsonMessage.history)
            }
        }
    }

    useEffect(() => {
        handleSocketMessage()
    }, [lastJsonMessage])

    useEffect(() => {
        handleSocketConnection(getReadingStatus(readyState))
    }, [readyState])

    const renderHistory = history.map((item, index) => {
        const color =
            item.number === 0 ? "green" :
            config.games.wheelColors.red.includes(item.number) ? "red" : "black"

        return (
            <div>
                <div
                    className={"wheel-history-number"}
                    onClick={() => push("?modal=gameCheck", { data: item })}
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

    const BettingTable = () => {
        return (
            <div>

            </div>
        )
    }

    return (
        <Panel id={nav}>
            <div style={{ height: "100vh" }}>
                <SimpleCell
                    before={<BackButton onClick={() => back()}/>}
                    disabled
                    subtitle={`Онлайн: 0`}
                    style={{ padding: 0 }}
                >
                    Wheel
                </SimpleCell>

                <div style={{ width: platform.isDesktop() ? "60%" : "auto", padding: 15 }}>
                    <div className={"wheel-history-container"}>
                        <div className={"wheel-history-container--head"}>
                            История игр
                        </div>

                        <HorizontalScroll>
                            <div style={{ display: "flex" }}>
                                {
                                    !history.length ? (
                                        <div className={"wheel-history-empty"}>
                                            Игр ещё не было
                                        </div>
                                    ) : renderHistory
                                }
                            </div>
                        </HorizontalScroll>
                    </div>

                    <div style={{
                        background: "var(--card-background)",
                        borderRadius: 12,
                        height: 200,
                        marginTop: 15
                    }}></div>

                    <div style={{ height: 15 }} />

                    <BettingBlock />
                    <BettingTable />
                </div>

                {
                    platform.isDesktop() ? (
                        <div className={"wheel-chat-box"}>
                            <Chat />
                        </div>
                    ) : (
                        <div className={"wheel-chat-bubble-container"}>
                            <ChatBubble />
                        </div>
                    )
                }
            </div>
        </Panel>
    )
}