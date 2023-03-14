import React from "react"
import { useMeta } from "@itznevikat/router"
import {
    ModalCard,
    Placeholder
} from "@vkontakte/vkui"
import { Icon36CoinsStacks3Outline } from "@vkontakte/icons"

import { formatNumToKFormat } from "../functions"

export const CardBonusModal = ({ nav }) => {
    const { win, bonus = 0 } = useMeta()

    return (
        <ModalCard nav={nav}>
            <Placeholder
                icon={
                    <Icon36CoinsStacks3Outline
                        style={{
                            width: 55,
                            height: 55,
                            color: win ? "var(--green)" : "var(--red)"
                        }}
                    />
                }
                header={win ? "Успех!" : "Эх, вы пытались :("}
            >
                {
                    win ? `Вы выиграли ${formatNumToKFormat(bonus)} монет. Они уже зачислены на ваш баланс` :
                        "К сожалению, вы ничего не выиграли, но не стоит расстраиваться, " +
                        "ведь новая попытка будет доступна через 4 часа"
                }
            </Placeholder>
        </ModalCard>
    )
}