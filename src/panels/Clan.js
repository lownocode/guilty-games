import React from "react"

import {
    Panel,
    SimpleCell
} from "@vkontakte/vkui"
import { Icon20ShieldLineOutline } from "@vkontakte/icons"

export const Clan = ({ nav }) => (
    <Panel id={nav}>
        <SimpleCell
            disabled
            before={<Icon20ShieldLineOutline width={24} height={24} style={{ color: "var(--accent)" }} />}
        >
            <b>Клан</b>
        </SimpleCell>
    </Panel>
)