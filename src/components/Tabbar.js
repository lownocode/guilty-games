import React from "react"
import { TabbarItem, Tabbar as VKUITabbar } from "@vkontakte/vkui"
import { replace, useLocation } from "@itznevikat/router"
import {
    Icon20ShieldLineOutline,
    Icon20UserCircleOutline,
    Icon28GameOutline,
    Icon32PollOutline
} from "@vkontakte/icons"

import "../styles/components/tabbar.css"

export const Tabbar = () => {
    const location = useLocation()

    const Item = props => {
        const { icon, onClick } = props

        return (
            <div
                className={"tabbar-item"}
                onClick={onClick}
            >
                {icon}
            </div>
        )
    }

    return (
        <div className={"tabbar-container"}>
            <Item
                onClick={() => replace("/")}
                icon={
                    <Icon20UserCircleOutline
                        width={28}
                        height={28}
                        className={location.pathname === "/" ? "active-icon" : "inactive-icon"}
                    />
                }
            />

            <Item
                onClick={() => replace("/rating")}
                icon={
                    <Icon32PollOutline
                        width={28}
                        height={28}
                        className={location.pathname === "/rating" ? "active-icon" : "inactive-icon"}
                    />
                }
            />

            <Item
                onClick={() => replace("/games")}
                icon={
                    <Icon28GameOutline
                        width={28}
                        height={28}
                        className={location.pathname === "/games" ? "active-icon" : "inactive-icon"}
                    />
                }
            />

            <Item
                onClick={() => replace("/clan")}
                icon={
                    <Icon20ShieldLineOutline
                        width={28}
                        height={28}
                        className={location.pathname === "/clan" ? "active-icon" : "inactive-icon"}
                    />
                }
            />
        </div>
    )
}