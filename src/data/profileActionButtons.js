import React, { useMemo } from "react"
import { push } from "@itznevikat/router"

import {
    SimpleCell
} from "@vkontakte/vkui"
import {
    Icon24PaletteOutline,
    Icon24PenOutline,
    Icon24TicketOutline,
    Icon24Users3Outline
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
            title: "Наша группа",
            icon: <Icon24Users3Outline style={{ color: "var(--accent)" }} />,
            href: "https://vk.com/public219192868"
        }
    ],
]

export const ProfileActionButtons = React.memo(() => {
    return useMemo(() => {
        return profileActionButtons.map(chunk => {
            return (
                <div className="profile-action-buttons--container">
                    {
                        useMemo(() => {
                            return chunk.map(button => (
                                <SimpleCell
                                    onClick={button.onClick}
                                    target={"_blank"}
                                    href={button.href}
                                    before={button.icon}
                                    className="profile-action-buttons--button"
                                >
                                    {button.title}
                                </SimpleCell>
                            ))
                        }, [])
                    }
                </div>
            )
        })
    }, [])
})