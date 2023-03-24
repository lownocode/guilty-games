import React from "react"
import { push } from "@itznevikat/router"

import {
    SimpleCell
} from "@vkontakte/vkui"
import {
    Icon24PaletteOutline,
    Icon24PenOutline,
    Icon24TicketOutline,
    Icon24CubeBoxOutline
} from "@vkontakte/icons"

const profileActionButtons = [
    [
        {
            title: "Никнейм",
            icon: <Icon24PenOutline style={{ color: "var(--accent)" }} />,
            onClick: () => push("/?modal=changeNickname")
        },
        {
            title: "Цвет никнейма",
            icon: <Icon24PaletteOutline style={{ color: "var(--accent)" }} />,
            onClick: () => push("/?modal=changeNicknameColor")
        }
    ],
    [
        {
            title: "Промокоды",
            icon: <Icon24TicketOutline style={{ color: "var(--accent)" }} />,
            onClick: () => push("/promocodes")
        },
        {
            title: "Инвентарь",
            icon: <Icon24CubeBoxOutline style={{ color: "var(--accent)" }} />,
            onClick: () => push("/inventory")
        }
    ]
]

export const profileActionButtonsRender = profileActionButtons.map((chunk, chunkIndex) => {
    return (
        <div
            className="profile-action-buttons--container"
            key={"chunk-" + chunkIndex}
        >
            {
                chunk.map(button => (
                    <SimpleCell
                        key={"button-" + button.title}
                        onClick={button.onClick}
                        before={button.icon}
                        className="profile-action-buttons--button"
                    >
                        {button.title}
                    </SimpleCell>
                ))
            }
        </div>
    )
})