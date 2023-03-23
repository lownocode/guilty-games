import React from "react"

import {
    Panel,
    SimpleCell
} from "@vkontakte/vkui"
import { BackButton } from "../../components"
import { back } from "@itznevikat/router"

export const WheelGame = ({ nav }) => {
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
        </Panel>
    )
}