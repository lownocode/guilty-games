import React, { useEffect, useState } from "react"
import axios from "axios"
import { push } from "@itznevikat/router"

import {
    Panel,
    SimpleCell
} from "@vkontakte/vkui"
import {
    Icon28GameOutline,
    Icon16Users2Outline
} from "@vkontakte/icons"

import "../styles/panels/games.css"
import { getRunParams } from "../functions"
import wheelImage from "../assets/games-preview/wheel.jpg"
import wheelPlusImage from "../assets/games-preview/wheel-plus.jpg"

const games = [
    {
        id: "wheel",
        title: "Wheel",
        image: wheelImage,
        onClick: () => push("/game/wheel")
    },
    {
        id: "wheel-plus",
        title: "Wheel Plus",
        image: wheelPlusImage,
        onClick: () => push("/game/wheel")
    },
]

export const Games = ({ nav }) => {
    const [ gamesOnline, setGamesOnline ] = useState([])

    const getGamesOnline = async () => {
        await axios.post("/game/online", null, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ data }) => setGamesOnline(data))
    }

    useEffect(() => {
        getGamesOnline()
    }, [])

    const renderGames = games.map(game => {
        return (
            <div
                key={"game-" + game.id}
                className={"games-game-card--container"}
                onClick={game.onClick}
                style={{
                    backgroundImage: `url(${game.image})`,
                }}
            >
                <div className={"games-game-card--title"}>
                    {game.title}

                    <div
                        style={{
                            height: 6,
                            width: 1,
                            background: "var(--divider-color)",
                            margin: "0 5px"
                        }}
                    />

                    <div className={"games-game-card--online"}>
                        <Icon16Users2Outline style={{ width: 12, height: 12, marginRight: 3 }} />
                        {gamesOnline.length ? gamesOnline.find(g => g.game === game.id)?.online || 0 : 0}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <Panel id={nav}>
            <SimpleCell
                disabled
                before={<Icon28GameOutline width={24} height={24} style={{ color: "var(--accent)" }} />}
            >
                <b>Игры</b>
            </SimpleCell>

            <div
                className={"games-game-card--box"}
            >
                {renderGames}
            </div>

            <div style={{ height: "var(--panel-indent)" }} />
        </Panel>
    )
}