import React from "react"

import {
    Panel,
    SimpleCell
} from "@vkontakte/vkui"
import { Icon28GameOutline } from "@vkontakte/icons"

export const Games = ({ id }) => (
    <Panel id={id}>
        <SimpleCell
        disabled
        before={<Icon28GameOutline width={24} height={24} style={{ color: "var(--accent)" }} />}
        >
            <b>Игры</b>
        </SimpleCell>
    </Panel>
)