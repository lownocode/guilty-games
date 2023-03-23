import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
    Panel,
    SimpleCell,
    Avatar,
    PullToRefresh,
} from "@vkontakte/vkui"
import {
    Icon24StarsOutline,
    Icon28ChevronRightOutline,
    Icon32PollOutline
} from "@vkontakte/icons"

import ratingBackground from "../assets/rating-background.jpg"
import { formatNumToKFormat, splitSum } from "../functions"
import { getDailyRating } from "../redux/reducers"
import { config, nicknameColors } from "../data"
import { push } from "@itznevikat/router"

export const Rating = ({ nav }) => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)
    const { dailyRating, fetchingRating } = useSelector(state => state.rating)

    const getRatingData = async () => {
        dispatch(getDailyRating())
    }

    useEffect(() => {
        dispatch(getDailyRating())
    }, [])

    const items = dailyRating?.users?.map((user, index) => {
        return (
            <SimpleCell
                key={`user` + user.vkId}
                style={{
                    background: "var(--card-background)",
                    margin: "5px 20px",
                    borderRadius: 15,
                    maxHeight: 65,
                    paddingLeft: 0,
                    border: user.vkId === userData.vkId ? "1px solid var(--accent)" : "none",
                }}
                onClick={() => push("?popout=userInfo", { user })}
                before={
                    <div
                        style={{
                            minWidth: 40,
                            color: "var(--accent)",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        {index + 1}
                    </div>
                }
                after={
                    user.reward > -1 ? (
                        <div
                            style={{
                                color: "var(--accent)",
                                fontWeight: "bold"
                            }}
                        >
                            {formatNumToKFormat(user.reward)} {dailyRating.currency}
                        </div>
                    ) : <Icon28ChevronRightOutline color={"var(--accent)"} />
                }
            >
                <SimpleCell
                    style={{ padding: 0, color: nicknameColors[user.nameColors[0]] }}
                    disabled
                    before={<Avatar src={user.photo} style={{ marginTop:0, marginBottom: 0 }} />}
                    subtitle={`${splitSum(user.stats.dailyWinCoins)} ${dailyRating.currency}`}
                >
                    {user.name}
                </SimpleCell>
            </SimpleCell>
        )
    })

    return (
        <Panel id={nav}>
            <SimpleCell
                disabled
                before={<Icon32PollOutline width={24} height={24} style={{ color: "var(--accent)" }} />}
            >
                <b>Рейтинг</b>
            </SimpleCell>

            <div
                style={{
                    borderRadius: 15,
                    padding: 20,
                    backgroundImage: `url(${ratingBackground})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    margin: 20
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center"
                    }}
                >
                    <Icon24StarsOutline width={28} height={28} color={"#fff"} />

                    <div
                        style={{
                            color: "#fff",
                            fontWeight: "500",
                            marginLeft: 10,
                            fontSize: 20
                        }}
                    >
                        Дневной рейтинг
                    </div>
                </div>

                <div style={{ marginTop: 15, color: "#fff" }}>
                    Каждый день мы разыгрываем <b>{splitSum(dailyRating.totalReward ?? 0)} {dailyRating.currency}</b> среди
                    10 лучших игроков. Выдача призов происходит ровно в 0:00 по МСК
                </div>

                <div
                    style={{
                        margin: "15px 0"
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontWeight: "100"
                        }}
                    >
                        Ваше место
                        <div
                            style={{ fontWeight: "500" }}
                        >
                            {dailyRating.currentUserIndex}
                        </div>
                    </div>

                    <div
                        style={{
                            width: 1,
                            background: "rgba(255,255,255,0.68)",
                            height: 20
                        }}
                    />

                    <div
                        style={{
                            textAlign: "center",
                            color: "#fff",
                            fontWeight: "100"
                        }}
                    >
                        Вы наиграли
                        <div
                            style={{ fontWeight: "500" }}
                        >
                            {splitSum(userData.stats.dailyWinCoins)} {config.currency}
                        </div>
                    </div>
                </div>
            </div>

            <PullToRefresh
                isFetching={fetchingRating}
                onRefresh={() => getRatingData()}
            >
                {items}
            </PullToRefresh>

            <div style={{ height: "var(--panel-indent)" }} />
        </Panel>
    )
}