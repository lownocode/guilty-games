import React, { useEffect, useState } from "react"
import { back, push } from "@itznevikat/router"
import { useDispatch, useSelector } from "react-redux"
import useWebSocket from "react-use-websocket"
import bridge from "@vkontakte/vk-bridge"

import {
    Panel,
    SimpleCell,
    HorizontalScroll,
    Avatar
} from "@vkontakte/vkui"

import "../../styles/games/wheel.css"
import { BackButton, BettingBlock, Chat, ChatBubble } from "../../components"
import { config, nicknameColors } from "../../data"
import { formatNumToKFormat, platform, splitSum } from "../../functions"
import { getReadingStatus } from "../../websocket/helpers"
import { setLoading, setUser } from "../../redux/reducers"
import { CoinIcon } from "../../assets"

export const WheelGame = ({ nav }) => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const { vkToken } = useSelector(state => state.app)
    const { readyState, lastJsonMessage, sendJsonMessage } = useWebSocket(`${config.wsUrl}/game/wheel`, {
        queryParams: {
            "vk-params": encodeURIComponent(window.vkParams)
        },
        onClose: ({ reason }) => handleSocketConnection("closed", JSON.parse(reason)),
    })

    const [ timer, setTimer ] = useState(0)
    const [ betsUsersVkData, setBetsUsersVkData ] = useState([])
    const [ gameData, setGameData ] = useState({
        history: [],
        users: [],
        online: 0,
    })

    const totalBetsAmount = gameData.users.map(({ bets }) => bets.reduce((a, b) => a + b.value, 0)).reduce((a, b) => a + b, 0)
    const userBetsAmount = gameData.users
        .filter(({ vkId }) => vkId === userData.vkId)
        .map(({ bets }) => bets.reduce((a, b) => a + b.value, 0))

    useEffect(() => {
        dispatch(setLoading(true))
    }, [])

    const handleSocketConnection = (status, data) => {
        switch (status) {
            case "open": {
                return dispatch(setLoading(false))
            }
            case "closed": {
                if (data) {
                    if (data.code === "ALREADY_CONNECTED") {
                        back()
                    }
                }
            }
        }
    }

    const getVkUsersData = async (ids) => {
        const { response } = await bridge.send("VKWebAppCallAPIMethod", {
            method: "users.get",
            params: {
                v: "5.131",
                user_ids: ids,
                access_token: vkToken,
                fields: "photo_200"
            }
        })

        return response
    }

    const handleSocketMessage = async () => {
        if (!lastJsonMessage) return

        switch (lastJsonMessage.type) {
            case "INIT": {
                setTimer(0)
                if (lastJsonMessage.status === "ENDED") {
                    setGameData({
                        ...lastJsonMessage,
                        type: "GAME_RESULT"
                    })
                }

                if (lastJsonMessage.users.length >= 1) {
                    const vkUsersData = await getVkUsersData(lastJsonMessage.users.map(({ vkId }) => vkId).join(","))

                    setBetsUsersVkData(vkUsersData)
                }

                break
            }
            case "TIMER": {
                return setTimer(lastJsonMessage.time)
            }
            case "NEW_BET": {
                if (lastJsonMessage.user.vkId === userData.vkId) {
                    dispatch(setUser({
                        ...userData,
                        balance: userData.balance - lastJsonMessage.bet.value
                    }))
                }

                const userBets = gameData.users.find(({ vkId }) => vkId === lastJsonMessage.user.vkId)?.bets || []
                const newUserBets = userBets.concat(lastJsonMessage.bet)

                const newBets = gameData.users.map(bet => {
                    if (bet.vkId === lastJsonMessage.user.vkId) {
                        return {
                            ...bet,
                            bets: newUserBets
                        }
                    }

                    return bet
                })

                setGameData(prevState => ({
                    ...prevState,
                    users: !userBets.length ? [
                        {
                            ...lastJsonMessage.user,
                            bets: [{ ...lastJsonMessage.bet }]
                        },
                        ...prevState.users
                    ] : newBets
                }))

                if (!gameData.users.find(({ vkId }) => vkId === lastJsonMessage.user.vkId)) {
                    const vkUsersData = await getVkUsersData(lastJsonMessage.user.vkId)

                    setBetsUsersVkData(prevState => prevState.concat(vkUsersData))
                }

                break
            }
            case "GAME_RESULT": {
                const newUsersBets = gameData.users.map(user => {
                    const newBets = user.bets.map(bet => {
                        if (lastJsonMessage.winBets.includes(bet.id)) {
                            return { ...bet, isWin: true }
                        }

                        return { ...bet, isWin: false }
                    })

                    return { ...user, bets: newBets }
                })

                dispatch(setUser({
                    ...userData,
                    balance: lastJsonMessage.balance
                }))

                return setGameData({
                    ...gameData,
                    type: "GAME_RESULT",
                    reward: lastJsonMessage.reward,
                    winBets: lastJsonMessage.winBets,
                    users: newUsersBets,
                    salt: lastJsonMessage.salt,
                    history: [
                        {
                            number: lastJsonMessage.number,
                            hash: lastJsonMessage.hash,
                            salt: lastJsonMessage.salt
                        },
                        ...gameData.history
                    ]
                })
            }
        }
    }

    useEffect(() => {
        handleSocketMessage()
    }, [lastJsonMessage])

    useEffect(() => {
        handleSocketConnection(getReadingStatus(readyState))
    }, [readyState])

    const renderHistory = gameData.history.map((item, index) => {
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
                        marginRight: index + 1 === gameData.history.length ? 12 : 7,
                        marginLeft: !index ? 12 : 0
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
                <div
                    style={{
                        width: 100,
                        height: 100,
                        background: "red",
                    }}
                    onClick={() => sendJsonMessage({
                        "cmd": "addBet",
                        "coins": 1000,
                        "type": "range:1-12"
                    })}
                />
            </div>
        )
    }

    const Bet = ({ data, clipEnd }) => {
        const {
            id,
            type,
            value,
            isWin = "none"
        } = data

        const numberColor =
            config.games.wheelColors.red.includes(Number(type.split(":")[1]))
                ? "var(--wheel-red)"
                : config.games.wheelColors.black.includes(Number(type.split(":")[1]))
                    ? "var(--wheel-black)"
                    : "var(--wheel-green)"

        const color = {
            [`range:${type.split(":")[1]}`]: "var(--wheel-range)",
            "red": "var(--wheel-red)",
            "black": "var(--wheel-black)",
            [`number:${type.split(":")[1]}`]: numberColor,
            "even": "var(--wheel-even)",
            "odd": "var(--wheel-odd)"
        }[type]

        const text = {
            [`range:${type.split(":")[1]}`]: type.split(":")[1],
            "red": "Красное",
            "black": "Чёрное",
            [`number:${type.split(":")[1]}`]: type.split(":")[1],
            "even": "Чётное",
            "odd": "Нечётное"
        }[type]

        return (
            <div
                key={"bet-" + id}
                style={{
                    height: 53,
                    minWidth: 70,
                    background: "var(--my-bets-bet-background)",
                    borderRadius: 10,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginRight: clipEnd ? 0 : 8,
                    [isWin !== "none" && "boxShadow"]: `var(--${isWin ? "green" : "red"}) 0 0 0 1px`
                }}
            >
                <div
                    style={{
                        background: color,
                        color: "#fff",
                        flex: 1,
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0 10px",
                        fontSize: 14
                    }}
                >
                    {text}
                </div>

                <div
                    style={{
                        textAlign: "center",
                        fontSize: 13,
                        margin: "2px 10px",
                    }}
                >
                    {formatNumToKFormat(value)}
                </div>
            </div>
        )
    }

    const renderBets = gameData.users.map(user => {
        const userPhoto = betsUsersVkData.find(({ id }) => id === user.vkId)?.photo_200
        const betsAmount = user.bets.reduce((a, b) => a + b.value, 0)

        const winnedBets = user.bets.filter(({ id }) => gameData?.winBets?.includes(id))
        const reward = gameData.type === "GAME_RESULT"
            ? winnedBets.reduce(
                (a, b) => a + b.value,
                -user.bets.reduce((a, b) => a + b.value, 0)
            )
            : "none"

        const textColor = `var(--${gameData.type === "GAME_RESULT" ? reward >= 1 ? "green" : "red" : "text-secondary"}`

        return (
            <div
                style={{
                    borderRadius: 13,
                    background: "var(--betting-table-background)",
                    marginBottom: 15,
                    overflow: "hidden"
                }}
            >
                <SimpleCell
                    before={<Avatar size={42} src={userPhoto} />}
                    subtitle={
                        <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            color: textColor
                        }}
                        >
                            {
                                gameData.type === "GAME_RESULT"
                                    ? reward !== "none" && reward >= 1
                                        ? "Выиграно"
                                        : "Проиграно"
                                    : "Сумма ставок"
                            }: {splitSum(reward !== "none" && reward ? Math.abs(reward) : betsAmount)}

                            <CoinIcon
                                size={12}
                                style={{ marginLeft: 4 }}
                                color={textColor}
                            />
                        </div>
                    }
                >
                    <div
                        className={"username"}
                        style={{
                            backgroundImage: nicknameColors[user.nameColor]
                        }}
                    >
                        {user.name}
                    </div>
                </SimpleCell>

                <div
                    style={{
                        height: 1,
                        background: "var(--betting-table-divider-color)",
                        margin: "0 10px"
                    }}
                />

                <div
                    style={{
                        padding: 10,
                        display: "flex",
                        flexWrap: "wrap",
                        rowGap: 12,
                        columnGap: 8
                    }}
                >
                    {user.bets.map(data => <Bet data={data} clipEnd />)}
                </div>
            </div>
        )
    })

    const renderMyBets = gameData.users
        .filter(({ vkId }) => vkId === userData.vkId)
        .map(({ bets }) => bets.map((data, index) => {
            return (
                <div
                    style={{
                        marginLeft: index === 0 ? 12 : 0,
                    }}
                >
                    <Bet data={data} />
                </div>
            )}
        ))

    return (
        <Panel id={nav}>
            <div style={{ minHeight: "100vh" }}>
                <SimpleCell
                    before={<BackButton onClick={() => back()}/>}
                    disabled
                    subtitle={`Онлайн: ${gameData.online}`}
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
                                    !gameData.history.length ? (
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
                        marginTop: 15,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: 25,
                        fontWeight: "600"
                    }}>
                        {timer}
                    </div>

                    <div style={{ height: 15 }} />

                    <div
                        style={{
                            background: "var(--card-background)",
                            borderRadius: 12,
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center"
                            }}
                        >
                            <div
                                style={{
                                    textTransform: "uppercase",
                                    fontWeight: "300",
                                    fontSize: 13,
                                    color: "var(--text-color)",
                                    padding: "12px 0 8px 12px"
                                }}
                            >
                                Ваши ставки
                            </div>

                            {
                                userBetsAmount >= 1 && (
                                    <div
                                        style={{
                                            padding: "2px 8px",
                                            background: gameData.type === "GAME_RESULT" ? `var(--${gameData.reward >= 1 ? "green" : "red"})` : "var(--accent)",
                                            borderRadius: 100,
                                            color: "#fff",
                                            marginLeft: 10,
                                            fontSize: 12,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {splitSum(gameData.type === "GAME_RESULT" ? gameData.reward : userBetsAmount)}
                                        <CoinIcon style={{ marginLeft: 5 }} size={12} />
                                    </div>
                                )
                            }
                        </div>

                        {
                            renderMyBets.length === 0 ? (
                                <div
                                    style={{
                                        fontWeight: "300",
                                        color: "var(--text-secondary)",
                                        fontSize: 14,
                                        padding: "0 12px 12px 12px"
                                    }}
                                >
                                    Вы ещё не сделали ставок в этой игре
                                </div>
                            ) : (
                                <HorizontalScroll>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            marginTop: 6,
                                            marginBottom: 12,
                                        }}
                                    >
                                        {renderMyBets}
                                    </div>
                                </HorizontalScroll>
                            )
                        }
                    </div>

                    <div style={{ height: 15 }} />

                    <BettingBlock />
                    <BettingTable />

                    {
                        renderBets.length >= 1 && (
                            <div>
                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginTop: 60
                                    }}
                                >
                                    <div
                                        style={{
                                            textTransform: "uppercase",
                                            fontWeight: "300",
                                            fontSize: 13,
                                            color: "var(--text-color)",
                                        }}
                                    >
                                        Ставки игроков
                                    </div>

                                    <div
                                        style={{
                                            padding: "2px 8px",
                                            background: "var(--accent)",
                                            borderRadius: 100,
                                            color: "#fff",
                                            marginLeft: 10,
                                            fontSize: 12,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        {splitSum(totalBetsAmount)}
                                        <CoinIcon style={{ marginLeft: 5 }} size={12} />
                                    </div>
                                </div>

                                <div style={{ marginTop: 15 }}>
                                    {renderBets}
                                </div>
                            </div>
                        )
                    }

                    <div
                        onClick={() => push("?modal=gameCheck", { data: gameData.history[0] })}
                        style={{
                            textAlign:"center",
                            color: "var(--text-secondary)",
                            fontSize: 15,
                            marginTop: 50,
                            marginBottom: 150
                        }}
                    >
                        {
                            gameData.hash && (
                                <div>
                                    Хеш: {gameData.hash}
                                </div>
                            )
                        }

                        {
                            gameData.salt && (
                                <div>
                                    Проверка: {gameData.salt}
                                </div>
                            )
                        }
                    </div>
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