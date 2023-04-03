import React from "react"
import { useSelector } from "react-redux"

import {
    Input,
    FormItem,
} from "@vkontakte/vkui"

import { formatNumToKFormat, splitSum } from "../functions"
import { CoinIcon } from "../assets"

export const BettingBlock = (props) => {
    const { userData } = useSelector(state => state.user)

    const addButtons = [
        userData.balance / 4 || 0,
        userData.balance / 3 || 0,
        userData.balance / 2 || 0,
        userData.balance || 0,
    ]

    const renderAddButtons = addButtons.map((amount, index) => {
        if (amount <= 0) return

        return (
            <div
                key={"addbutton-" + index}
                style={{
                    background: "var(--card-background)",
                    color: "var(--text-color)",
                    padding: "10px 15px",
                    borderRadius: 12,
                    flex: 1,
                    marginRight: index + 1 === addButtons.length ? 0 : 10,
                    fontSize: 13,
                    textAlign: "center",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                {formatNumToKFormat(Math.trunc(amount))}

                <div
                    style={{
                        background: "var(--card-background)",
                        position: "absolute",
                        fontSize: 11,
                        padding: "0 7px",
                        borderRadius: "0 0 8px 8px",
                        bottom: -12,
                        color: "var(--text-secondary)"
                    }}
                >
                    добавить
                </div>
            </div>
        )
    })

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <div
                    style={{
                        textTransform: "uppercase",
                        fontWeight: "300",
                        fontSize: 13,
                        color: "var(--text-color)"
                    }}
                >
                    Ваш баланс
                </div>

                <div
                    style={{
                        borderRadius: 12,
                        padding: "10px 15px",
                        background: "var(--card-background)",
                        fontWeight: "500",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {splitSum(userData.balance)}

                    <CoinIcon
                        size={14}
                        style={{ marginLeft: 5 }}
                    />
                </div>
            </div>

                <div
                    style={{
                        padding: 0,
                        margin: "10px 0",
                        display: "flex",
                    }}
                >
                    <Input
                        type={"number"}
                        style={{
                            flex: 1,
                            height: 40
                        }}
                        placeholder={"Введите ставку"}
                    />

                    <div
                        style={{
                            borderRadius: 12,
                            padding: "10px 15px",
                            background: "var(--card-background)",
                            margin: "0 9px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        x2
                    </div>

                    <div
                        style={{
                            borderRadius: 12,
                            padding: "10px 15px",
                            background: "var(--card-background)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        /2
                    </div>
                </div>

            <div
            style={{
                display: "flex",
                alignItems: "center",
            }}
            >
                {renderAddButtons}
            </div>
        </div>
    )
}