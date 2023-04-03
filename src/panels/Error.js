import React from "react"
import {
    Panel,
    Placeholder,
    Button
} from "@vkontakte/vkui"
import { useLocation } from "@itznevikat/router"
import { config } from "../data"

export const Error = ({ error }) => {
    const { pathname } = useLocation()

    return (
        <Panel>
            <div
                style={{
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Placeholder
                    action={
                        <Button
                            href={config.supportUrl}
                            target={"_blank"}
                        >
                            Поддержка
                        </Button>
                    }
                    header={"Ой, ошибка!"}
                >
                    В приложении произошла внутренняя ошибка. Пожалуйста, сделайте скриншот данной
                    ошибки и отправьте его в техническую поддержку. Данные ошибки {pathname}:
                    <div
                        style={{
                            color: "var(--red)"
                        }}
                    >
                        {error.message}
                    </div>
                </Placeholder>
            </div>
        </Panel>
    )
}