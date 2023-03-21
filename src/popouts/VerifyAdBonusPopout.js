import React from "react"
import HCaptcha from "@hcaptcha/react-hcaptcha"
import axios from "axios"
import { replace, useLocation } from "@itznevikat/router"

import {
    Button,
    useAppearance
} from "@vkontakte/vkui"

import { config } from "../data"
import { getRunParams } from "../functions"
import { useDispatch } from "react-redux"
import { openSnackbar } from "../redux/reducers"

export const VerifyAdBonusPopout = () => {
    const dispatch = useDispatch()
    const theme = useAppearance()
    const location = useLocation()

    const verifyAd = async (token) => {
        await axios.post("/bonus/ads", null, {
            headers: {
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
            .finally(() => replace(location.pathname))
    }

    return (
        <div
            style={{
                background: "rgba(0,0,0,0.37)",
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
                    onVerify={(token, ekey) => {verifyAd(token);console.log(ekey)}}
                    theme={theme}
                />

                <div style={{ marginTop: 15 }}>
                    <Button
                        stretched
                        onClick={() => replace(location.pathname)}
                        size={"m"}
                        style={{
                            color: "#fff",
                            background: "rgba(10,10,10,0.8)",
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