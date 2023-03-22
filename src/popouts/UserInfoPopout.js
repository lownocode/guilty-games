import React from "react"
import { back, useMeta } from "@itznevikat/router"

import {
    SimpleCell,
    Avatar,
    Button
} from "@vkontakte/vkui"

import "../styles/popouts/user-info-popout.css"
import { formatNumToKFormat, splitSum } from "../functions"
import { config } from "../data"

export const UserInfoPopout = () => {
    const { user } = useMeta()

    const renderStats = () => {
        return (
            <div>
                <div
                    className={"user-info-popout-stats-card"}
                    style={{
                        borderRadius: "14px 14px 8px 8px",
                    }}
                >
                    <div style={{ textAlign: "center", color: "var(--text-color)" }}>
                        Выиграно сегодня
                        <div style={{ fontWeight: "500" }}>
                            {formatNumToKFormat(user.stats.dailyWinCoins)} {config.currency}
                        </div>
                    </div>

                    <div
                        style={{
                            width: 1,
                            height: 15,
                            background: "var(--divider-color)"
                        }}
                    />

                    <div style={{ textAlign: "center", color: "var(--text-color)" }}>
                        Проиграно сегодня
                        <div style={{ fontWeight: "500" }}>
                            {formatNumToKFormat(user.stats.dailyLoseCoins)} {config.currency}
                        </div>
                    </div>
                </div>

                <div
                    className={"user-info-popout-stats-card"}
                    style={{
                        marginTop: 4,
                        borderRadius: "8px 8px 14px 14px",
                    }}
                >
                    <div style={{ textAlign: "center", color: "var(--text-color)" }}>
                        Макс. выигрыш
                        <div style={{ fontWeight: "500" }}>
                            {formatNumToKFormat(user.stats.maxWinCoins)} {config.currency}
                        </div>
                    </div>

                    <div
                        style={{
                            width: 1,
                            height: 15,
                            background: "var(--divider-color)"
                        }}
                    />

                    <div style={{ textAlign: "center", color: "var(--text-color)" }}>
                        Всего наиграно
                        <div style={{ fontWeight: "500" }}>
                            {formatNumToKFormat(user.stats.totalBetCoins)} {config.currency}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={"user-info-popout-container"}>
            <div style={{ margin: 30 }}>
                <div className={"user-info-popout-close-button-container"}>
                    <div
                        onClick={() => back()}
                        className={"user-info-popout-close-button"}
                    >
                        Закрыть
                    </div>
                </div>

                <div className={"user-info-popout-container-box"}>
                    <SimpleCell
                        disabled
                        before={<Avatar src={user.photo} size={66} />}
                        style={{ padding: 0 }}
                        subtitle={
                            <div className={"user-info-popout-balance"}>
                                {splitSum(user.balance)} {config.currency}
                            </div>
                        }
                    >
                        {user.name}
                    </SimpleCell>

                    <div style={{ height: 20 }} />

                    {renderStats()}

                    <div style={{ height: 20 }} />

                    <Button
                        stretched
                        href={`https://vk.com/id${user.vkId}`}
                        target={"_blank"}
                        style={{
                            background: "#0077FF",
                            color: "#fff"
                        }}
                    >
                        В профиль ВК
                    </Button>
                </div>
            </div>
        </div>
    )
}