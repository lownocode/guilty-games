import React from "react"
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
        const { icon, onClick, path } = props

        return (
            <div
                className={"tabbar-item"}
                onClick={location.pathname !== path ? onClick : null}
            >
                {icon}
            </div>
        )
    }

    return (
        <div className={"tabbar-container"}>
            <Item
                path={"/"}
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
                path={"/rating"}
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
                path={"/games"}
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
                path={"/clan"}
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