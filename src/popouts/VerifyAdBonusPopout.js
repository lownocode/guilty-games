import React from "react"
import axios from "axios"
import bridge from "@vkontakte/vk-bridge"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import { back } from "@itznevikat/router"

import { Button } from "@vkontakte/vkui"

import { config } from "../data"
import { getRunParams } from "../functions"
import { useDispatch } from "react-redux"
import { openSnackbar } from "../redux/reducers"

export const VerifyAdBonusPopout = () => {
    const dispatch = useDispatch()

    const verifyAd = async (token) => {
        const { sign, ts } = await bridge.send("VKWebAppCreateHash")

        if (!sign) {
            back()
            return dispatch(openSnackbar({
                type: "success",
                text: "Произошла ошибка при попытке генерации подписи"
            }))
        }

        await axios.post("/bonus/ads", { ts }, {
            headers: {
                "vk-sign": sign,
                "vk-params": await getRunParams(),
                "h-captcha-token": token
            }
        })
            .then(({ data }) => {
                dispatch(openSnackbar({
                    type: "success",
                    text: data.message
                }))
            })
            .catch(({ response: { data } }) => {
                dispatch(openSnackbar({
                    type: "failure",
                    text: data.message
                }))
            })
            .finally(() => back())
    }

    return (
        <div
            style={{
                background: "var(--popout-background)",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <div>
                <HCaptcha
                    sitekey={config.hcaptchaSitekey}
                    onVerify={token => verifyAd(token)}
                />

                <div style={{ marginTop: 15 }}>
                    <Button
                        stretched
                        onClick={() => back()}
                        size={"m"}
                        style={{
                            color: "#ff8989",
                            background: "rgba(255,76,76,0.42)",
                            borderRadius: 100
                        }}
                    >
                        Закрыть окно
                    </Button>
                </div>
            </div>
        </div>
    )
}