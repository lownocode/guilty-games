import React from "react"

import {
    ModalCard,
    Button
} from "@vkontakte/vkui"
import { useMeta } from "@itznevikat/router"
import bridge from "@vkontakte/vk-bridge"
import { useDispatch } from "react-redux"
import { openSnackbar } from "../redux/reducers"

export const GameCheckModal = ({ nav }) => {
    const dispatch = useDispatch()

    const { data } = useMeta()

    const copySalt = () => {
        bridge.send("VKWebAppCopyText", {
            text: data.salt
        })
            .then(() => {
                dispatch(openSnackbar({
                    type: "success",
                    text: "Строка проверки скопирована"
                }))
            })
    }

    const check = () => {
        bridge.send("VKWebAppOpenApp", {
            app_id: 8181984,
            location: data.salt
        })
    }

    return (
        <ModalCard nav={nav}>
            <div
                style={{
                    color: "var(--text-secondary)",
                    fontSize: 15
                }}
            >
                Результат игры: {data.salt.split("@")[0]}
            </div>

            <div
                style={{
                    color: "var(--text-secondary)",
                    fontSize: 15,
                    marginTop: 10
                }}
            >
                Хеш игры: {data.hash}
            </div>

            <div
                style={{
                    color: "var(--text-secondary)",
                    fontSize: 15,
                    marginTop: 10
                }}
            >
                Строка проверки: {data.salt}
            </div>

            <div
                style={{
                    color: "var(--text-color)",
                    fontSize: 14,
                    fontWeight: "300",
                    marginTop: 10
                }}
            >
                Для проверки честности итогов игры вы должны скопировать строку проверки,
                вставить её в любой генератор хешей md5 и закодировать её. Если полученный результат
                совпадает с текущим хешем игры, значит игра была честной.
            </div>

            <div
                className={"defaultFlexbox"}
                style={{ marginTop: 15 }}
            >
                <Button
                    stretched
                    style={{ marginRight: 10 }}
                    onClick={() => copySalt()}
                >
                    Скопировать
                </Button>

                <Button
                    stretched
                    onClick={() => check()}
                >
                    Проверить
                </Button>
            </div>
        </ModalCard>
    )
}