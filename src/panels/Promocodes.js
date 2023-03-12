import React, {useEffect, useState} from "react"
import { back } from "@itznevikat/router"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import bridge from "@vkontakte/vk-bridge"

import {
    Button,
    Panel,
    SimpleCell,
    Spacing,
    Input,
    Placeholder,
    FormItem,
    FormLayout,
    IconButton
} from "@vkontakte/vkui"
import {
    Icon28StickerSmileOutline,
    Icon24CopyOutline,
    Icon24TicketOutline
} from "@vkontakte/icons"

import { BackButton } from "../components"
import { declOfNum, getRunParams, splitSum } from "../functions"
import {getPromocodesHistory, pushPromocodeToHistory} from "../redux/reducers"

export const Promocodes = ({ id }) => {
    const dispatch = useDispatch()
    const { promocodesHistory } = useSelector(state => state.app)

    const [ promocode, setPromocode ] = useState("")
    const [ fetchingActivatePromocode, setFetchingActivatePromocode ] = useState(false)
    const [ promocodeInputStatus, setPromocodeInputStatus ] = useState({ status: "default" })

    const [ createPromocodeActivates, setCreatePromocodeActivates ] = useState()
    const [ createPromocodeReward, setCreatePromocodeReward ] = useState()
    const [ createPromocodeInputStatus, setCreatePromocodeInputStatus ] = useState({ status: "default" })
    const [ fetchingCreatePromocode, setFetchingCreatePromocode ] = useState(false)

    useEffect(() => {
        dispatch(getPromocodesHistory())
    }, [])

    const activatePromocode = async () => {
        setFetchingActivatePromocode(true)

        await axios.post(`/promocode/use/${promocode}`, null, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ data }) => setPromocodeInputStatus({ ...data, status: "valid" }))
            .catch(({ response: { data } }) => setPromocodeInputStatus({ ...data, status: "error" }))
            .finally(() => setFetchingActivatePromocode(false))
    }

    const createPromocode = async () => {
        setFetchingCreatePromocode(true)

        await axios.post(`/promocode/create`, {
            maxActivates: createPromocodeActivates,
            reward: createPromocodeReward
        }, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ data }) => {
                dispatch(pushPromocodeToHistory({ ...data.data, type: "created" }))
                setCreatePromocodeInputStatus({ ...data, status: "valid" })
            })
            .catch(({ response: { data } }) => setCreatePromocodeInputStatus({ ...data, status: "error" }))
            .finally(() => setFetchingCreatePromocode(false))
    }

    const copyCode = (code) => {
        bridge.send("VKWebAppCopyText", {
            text: code
        })
            .then(() => console.log("success copied"))
            .catch(() => console.log("failed copied"))
    }

    const renderHistory = () => promocodesHistory.map(promocode => {
        return (
            <SimpleCell
                key={promocode.code}
                disabled
                after={
                    <IconButton onClick={() => copyCode(promocode.code)}>
                        <Icon24CopyOutline style={{ color: "var(--text-color)" }} />
                    </IconButton>
                }
                style={{
                    background: "var(--card-background)",
                    borderRadius: 12,
                    margin: "5px 15px",
                }}
                subtitle={
                    `${promocode.type === "activated" ? "+" : "-"} ${splitSum(promocode.reward)} GC` +
                    `${promocode.type === "created" ? ` • ${promocode.maxActivates} ${declOfNum(promocode.maxActivates, ["активация", "активации", "активаций"])}` : ""}`
                }
                before={<Icon24TicketOutline
                    style={{ color: promocode.type === "created" ? "var(--red)" : "var(--green)" }}
                />
            }
            >
                {promocode.type === "activated" ? "Активация" : "Создание"} {promocode.code}
            </SimpleCell>
        )
    })

    return (
        <Panel id={id}>
            <SimpleCell
                disabled
                style={{ paddingLeft: 0 }}
                before={<BackButton onClick={() => back()} />}
            >
                <b>Промокоды</b>
            </SimpleCell>

            <SimpleCell
                multiline
                subtitle={
                    <div>
                        <div>
                            Активируйте промокод, если он у вас есть и получите монеты
                        </div>

                        <Spacing size={10} />

                        <FormLayout>
                            <FormItem
                                style={{ padding: 0 }}
                                bottom={promocodeInputStatus.message}
                                status={promocodeInputStatus.status}
                            >
                                <Input
                                    value={promocode}
                                    onChange={event => setPromocode(event.target.value)}
                                    placeholder={"Введите промокод"}
                                />
                            </FormItem>
                        </FormLayout>

                        <Button
                            onClick={() => activatePromocode()}
                            size="m"
                            stretched
                            loading={fetchingActivatePromocode}
                            style={{
                                color: "#fff",
                                background: "var(--accent)",
                                marginTop: 15
                            }}
                        >
                            Активировать промокод
                        </Button>
                    </div>
                }
                disabled
                style={{
                    background: "var(--card-background)",
                    borderRadius: 13,
                    margin: 15,
                    paddingTop: 5,
                    paddingBottom: 5
                }}
            >
                Активировать промокод
            </SimpleCell>

            <SimpleCell
                multiline
                subtitle={
                    <div>
                        <div>
                            Награда за активацию умножается на количество активаций
                        </div>

                        <Spacing size={10} />

                        <FormLayout>
                            <FormItem
                                style={{ padding: 0 }}
                                bottom={createPromocodeInputStatus.message}
                                status={createPromocodeInputStatus.status}
                            >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Input
                                value={createPromocodeReward}
                                onChange={event => setCreatePromocodeReward(event.target.value)}
                                style={{ flex: 1 }}
                                type={"number"}
                                placeholder={"Награда за активацию"}
                            />

                            <div style={{ width: 15 }} />

                            <Input
                                value={createPromocodeActivates}
                                onChange={event => setCreatePromocodeActivates(event.target.value)}
                                style={{ flex: 1 }}
                                type={"number"}
                                placeholder={"Количество активаций"}
                            />
                        </div>

                            </FormItem>
                        </FormLayout>

                        <Button
                            size="m"
                            stretched
                            onClick={() => createPromocode()}
                            loading={fetchingCreatePromocode}
                            style={{
                                color: "#fff",
                                background: "var(--accent)",
                                marginTop: 15
                            }}
                        >
                            Создать промокод
                        </Button>
                    </div>
                }
                disabled
                style={{
                    background: "var(--card-background)",
                    borderRadius: 13,
                    margin: "0 15px",
                    paddingTop: 5,
                    paddingBottom: 5
                }}
            >
                Создать промокод
            </SimpleCell>

            <div
                style={{
                    margin: 20,
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center"
                }}
            >
                <Icon28StickerSmileOutline style={{ marginRight: 8 }} />
                История промокодов
            </div>

            {
                promocodesHistory.length === 0 ? (
                    <Placeholder
                        header={"История пуста"}
                    >
                        Вы еще не активировали и не создавали промокодов
                    </Placeholder>
                ) : renderHistory()
            }
        </Panel>
    )
}