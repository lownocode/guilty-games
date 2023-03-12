import React from "react"
import { back } from "@itznevikat/router"

import {
    Panel,
    SimpleCell,
    Button
} from "@vkontakte/vkui"
import {
    Icon24GiftOutline,
    Icon28PlayCards2Outline
} from "@vkontakte/icons"

import { BackButton } from "../components"

export const Bonuses = ({ id }) => (
    <Panel id={id}>
        <SimpleCell
            disabled
            style={{ paddingLeft: 0 }}
            before={<BackButton onClick={() => back()} />}
        >
            <b>Бонусы</b>
        </SimpleCell>

        <SimpleCell
            multiline
            subtitle={
                <div>
                    <div>
                        Каждые 5 минут вы можете получить бонус поддержки в размере от 50 до 150 монет,
                        но при этом ваш баланс должен быть близок к нулевому
                    </div>

                    <Button
                        size="m"
                        before={<Icon24GiftOutline width={20} height={20} />}
                        stretched
                        style={{
                            color: "#fff",
                            background: "var(--accent)",
                            marginTop: 15
                        }}
                    >
                        Получить бонус
                    </Button>
                </div>
            }
            disabled
            style={{
                background: "var(--card-background)",
                borderRadius: 13,
                margin: 15,
                paddingTop: 5,
                paddingBottom: 5,
            }}
        >
            Бонус поддержки
        </SimpleCell>

        <SimpleCell
            multiline
            subtitle={
                <div>
                    <div>
                        Смотрите рекламу и получайте бонус в размере от 100 до 300 монет за один просмотр
                    </div>

                    <Button
                        size="m"
                        before={<Icon28PlayCards2Outline width={20} height={20} />}
                        stretched
                        style={{
                            color: "#fff",
                            background: "var(--accent)",
                            marginTop: 15
                        }}
                    >
                        Смотреть рекламу
                    </Button>
                </div>
            }
            disabled
            style={{
                background: "var(--card-background)",
                borderRadius: 13,
                margin: "0 15px",
                paddingTop: 5,
                paddingBottom: 5,
            }}
        >
            Рекламный бонус
        </SimpleCell>
    </Panel>
)