import React from "react"

import {
    Panel,
    SimpleCell
} from "@vkontakte/vkui"
import {
    Icon28GameOutline,
    Icon16Users2Outline
} from "@vkontakte/icons"

import "../styles/panels/games.css"
import wheelImage from "../assets/games-images/wheel.jpg"

const games = [
    {
        title: "Wheel",
        image: wheelImage,
        online: 1,
    },
    {
        title: "Wheel",
        image: wheelImage,
        online: 1,
    },
    {
        title: "Wheel",
        image: wheelImage,
        online: 10,
    },
]

export const Games = ({ id }) => {
    const renderGames = games.map(game => {
        return (
            <div
                key={game.title}
                className={"games-game-card--container"}
                style={{
                    backgroundImage: `url(${game.image})`
                }}
            >
                <div className={"games-game-card--title"}>
                    {game.title}
                    <div className={"games-game-card--online"}>
                        <Icon16Users2Outline style={{ width: 12, height: 12, marginRight: 3 }} />
                        {game.online}
                    </div>
                </div>
            </div>
        )
    })

    return (
        <Panel id={id}>
            <SimpleCell
                disabled
                before={<Icon28GameOutline width={24} height={24} style={{ color: "var(--accent)" }} />}
            >
                <b>Игры</b>
            </SimpleCell>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    padding: 15,
                }}
            >
                {renderGames}
            </div>
        </Panel>
    )
}