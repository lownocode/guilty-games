import React, { useEffect, useState } from "react"
import axios from "axios"
import { back, push } from "@itznevikat/router"
import { useDispatch, useSelector } from "react-redux"

import {
    Panel,
    SimpleCell,
    Button,
    FormItem
} from "@vkontakte/vkui"
import {
    Icon24GiftOutline,
    Icon28PlayCards2Outline
} from "@vkontakte/icons"

import "../styles/panels/bonuses.css"
import { BackButton } from "../components"
import { formatNumToKFormat, getRunParams } from "../functions"
import {
    getUserData,
    openSnackbar,
    startCardsBonusTimer,
} from "../redux/reducers"
import { CoinIcon } from "../assets"
import bridge from "@vkontakte/vk-bridge"

const defaultCardsData = [
    { id: 0, isOpen: false },
    { id: 1, isOpen: false },
    { id: 2, isOpen: false },
    { id: 3, isOpen: false },
    { id: 4, isOpen: false },
    { id: 5, isOpen: false },
    { id: 6, isOpen: false },
    { id: 7, isOpen: false },
    { id: 8, isOpen: false },
]

export const Bonuses = ({ id }) => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    const [ supportBonusStatus, setSupportBonusStatus ] = useState({ status: "default" })
    const [ adBonusStatus, setAdBonusStatus ] = useState({ status: "default" })
    const [ loadingBtn, setLoadingBtn ] = useState(null)
    const [ loadingCard, setLoadingCard ] = useState(null)
    const [ bonusCards, setBonusCards ] = useState([])

    useEffect(() => {
        const defaultCards = defaultCardsData.map((card, index) => {
            const userCard = userData?.cardsData?.find(c => c.id === index && c.isOpen)

            if (userCard) return userCard

            return card
        })

        setBonusCards(defaultCards)
    }, [])

    const getSupportBonus = async () => {
        setLoadingBtn("supportBonus")

        await axios.post("/bonus/support", null, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ response: { data } }) => {
                dispatch(getUserData())
                setSupportBonusStatus({ ...data, status: "error" })
            })
            .catch(({ response: { data } }) => setSupportBonusStatus({ ...data, status: "error" }))
            .finally(() => setLoadingBtn(null))
    }


    const openCard = async cardIndex => {
        setLoadingCard(cardIndex)

        await axios.post("/bonus/cards", {
            index: cardIndex
        }, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ data }) => {
                if (data.fields) {
                    setTimeout(() => {
                        dispatch(getUserData())
                    }, 30_000)

                    push("?modal=cardBonus", {
                        win: Boolean(data.reward),
                        bonus: data.reward
                    })

                    return setBonusCards(data.fields)
                }

                const newCards = bonusCards.map((card, index) => {
                    if (cardIndex === index) return data

                    return card
                })

                setBonusCards(newCards)
            })
            .catch(({ response: { data } }) => dispatch(openSnackbar({
                text: data.message,
                type: "failure",
            })))
            .finally(() => setLoadingCard(null))
    }

    const bonusCardsRender = bonusCards.map((card, index) => {
        const {
            isOpen = false,
            value = null,
            id
        } = card

        const disabled = (
            bonusCards.find(_card => _card.id === id && _card.isOpen) ||
            bonusCards.filter(_card => _card.isOpen)?.length >= 4 ||
            loadingCard
        )

        const backgroundColor = {
            500: "linear-gradient(160deg, #b69836, #80a413, #b69836)",
            1500: "linear-gradient(160deg, #8bb636, #43a413, #8bb636)",
            3_000: "linear-gradient(160deg, #36abb6, #138ea4, #36abb6)",
            5_000: "linear-gradient(160deg, #0097ff, #1357a4, #0097ff)",
            10_000: "linear-gradient(160deg, #ffcc00, #be5c09, #ffcc00)",
            15_000: "linear-gradient(160deg, #bb64ff, #be09bb, #bb64ff)",
            25_000: "linear-gradient(160deg, #8b36b6, #6713a4, #8b36b6)"
        }[value]

        return (
            <div
                key={"card-" + index}
                onClick={() => !disabled && openCard(index)}
                className={
                    isOpen ? "bonuses-card-item--opened" :
                        value && !isOpen ? "bonuses-card-item--revealed" : "bonuses-card-item"
                }
                style={{
                    background: backgroundColor
                }}
            >
                {
                    isOpen ? (
                        <div className={"bonuses-card-item--text"}>
                            {formatNumToKFormat(value)}
                            <CoinIcon style={{ marginLeft: 5 }} size={14} />
                        </div>
                    ) : value && !isOpen ? (
                        <div className={"bonuses-card-item--revealed-text"}>
                            <div className={"bonuses-card-item--revealed-text-head"}>
                                Здесь было
                            </div>

                            {formatNumToKFormat(value)}
                            <CoinIcon style={{ marginLeft: 5 }} size={12} />
                        </div>
                    ) : (
                        <Icon24GiftOutline
                            className={loadingCard === index && "bonuses-infinity-rotate"}
                            style={{ color: "var(--bonus-card-icon-color)" }}
                        />
                    )
                }
            </div>
        )
    })

    const adBonus = async () => {
        setLoadingBtn("adBonus")

        const { result } = await bridge.send("VKWebAppCheckNativeAds", {
            ad_format: "reward"
        })

        if (!result) {
            setLoadingBtn(null)

            return dispatch(openSnackbar({
                type: "failure",
                text: "На данный момент для вас нет рекламы"
            }))
        }

        bridge.send("VKWebAppShowNativeAds", { ad_format: "reward" })
            .then(({ result }) => {
                if (result) {
                    return push("?popout=verifyAdBonus")
                }

                dispatch(openSnackbar({
                    type: "failure",
                    text: "По какой-то причине произошла ошибка при показе рекламы, попробуйте позже"
                }))
            })
            .catch(() => {
                dispatch(openSnackbar({
                    type: "failure",
                    text: "По какой-то причине произошла ошибка при показе рекламы, попробуйте позже"
                }))
            })
            .finally(() => setLoadingBtn(null))
    }

    useEffect(() => {
        dispatch(startCardsBonusTimer())
    }, [])

    return (
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
                            Каждые 4 часа вы можете открыть 4 любые карточки и если три из них будут совпадать,
                            то вы получите указанный на них бонус от 500 до 25 000 монет
                        </div>

                        {
                            userData.bonusesAvailableAt.cards > 0 ? (
                                <div>
                                    До нового бонуса осталось:
                                    <div className={"bonuses-card--timer"}>
                                        {
                                            new Date(userData.bonusesAvailableAt.cards * 1000).toISOString().slice(11, 19)
                                        }
                                    </div>
                                </div>
                            ) : (
                                <div className={"bonuses-card-container"}>
                                    {bonusCardsRender}
                                </div>
                            )
                        }
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
                Карточки с бонусом
            </SimpleCell>

            <SimpleCell
                multiline
                subtitle={
                    <div>
                        <div>
                            Каждые 5 минут вы можете получить бонус поддержки от 50 до 150 монет,
                            но при этом ваш баланс должен быть близок к нулевому
                        </div>

                        <FormItem
                            style={{ padding: 0 }}
                            bottom={supportBonusStatus.message}
                            status={supportBonusStatus.status}
                        >
                            <Button
                                size="m"
                                disabled={loadingBtn !== null || userData.balance > 5}
                                loading={loadingBtn === "supportBonus"}
                                before={<Icon24GiftOutline width={20} height={20} />}
                                stretched
                                onClick={() => getSupportBonus()}
                                style={{
                                    color: "#fff",
                                    background: "var(--accent)",
                                    marginTop: 15
                                }}
                            >
                                Получить бонус
                            </Button>
                        </FormItem>
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
                Бонус поддержки
            </SimpleCell>

            <SimpleCell
                multiline
                subtitle={
                    <div>
                        <div>
                            Смотрите рекламу и получайте бонус от 100 до 300 монет за один просмотр
                        </div>

                        <Button
                            size="m"
                            onClick={() => adBonus()}
                            disabled={loadingBtn !== null}
                            loading={loadingBtn === "adBonus"}
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
                    margin: 15,
                    paddingTop: 5,
                    paddingBottom: 5,
                }}
            >
                Рекламный бонус
            </SimpleCell>
        </Panel>
    )
}