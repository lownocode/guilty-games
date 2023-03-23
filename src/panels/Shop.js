import React from "react"
import { back } from "@itznevikat/router"

import {
    Panel,
    SimpleCell
} from "@vkontakte/vkui"

import {
    Icon20AdvertisingOutline,
    Icon36CoinsStackOutline,
    Icon36CoinsStacks2Outline,
    Icon36CoinsStacks3Outline,
    Icon16ChevronOutline
} from "@vkontakte/icons"

import { BackButton } from "../components"
import { splitSum } from "../functions"
import { CoinIcon } from "../assets"

const offers = [
    {
        cost: 4,
        coins: 15_000,
        profit: 0,
        type: "lite"
    },
    {
        cost: 12,
        coins: 50_000,
        profit: 11,
        type: "lite"
    },
    {
        cost: 23,
        coins: 100_000,
        profit: 16,
        type: "medium"
    },
    {
        cost: 56,
        coins: 250_000,
        profit: 19,
        type: "medium"
    },
    {
        cost: 110,
        coins: 500_000,
        profit: 21,
        type: "middle"
    },
    {
        cost: 215,
        coins: 1_000_000,
        profit: 24,
        type: "middle"
    },
    {
        cost: 530,
        coins: 2_500_000,
        profit: 26,
        type: "mega"
    },
    {
        cost: 1050,
        coins: 5_000_000,
        profit: 27,
        type: "mega"
    },
    {
        cost: 1570,
        coins: 7_500_000,
        profit: 27,
        type: "mega"
    }
]

export const Shop = ({ nav }) => {
    const offersRender = offers.map(offer => {
        const icon = () => {
            switch (offer.type) {
                case "lite": return <Icon36CoinsStackOutline style={{ color: "var(--shop-offer-lite)" }} />
                case "medium": return <Icon36CoinsStacks2Outline style={{ color: "var(--shop-offer-medium)" }} />
                case "middle": return <Icon36CoinsStacks3Outline style={{ color: "var(--shop-offer-middle)"}} />
                case "mega": return <Icon36CoinsStacks3Outline style={{ color: "var(--shop-offer-mega)" }} />
            }
        }

        return (
            <SimpleCell
                key={"offer-" + offer.cost}
                before={icon()}
                after={<Icon16ChevronOutline color={"var(--text-color)"}/>}
                subtitle={
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center"
                        }}
                    >
                        <Icon20AdvertisingOutline
                            width={14}
                            height={14}
                            style={{ marginRight: 5 }}
                        />
                        {splitSum(offer.cost)}
                    </div>
                }
                style={{
                    background: "var(--card-background)",
                    borderRadius: 10,
                    flexGrow: 1,
                    flex: 1,
                    margin: "5px 5px"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "600",
                    }}
                >
                    {splitSum(offer.coins)}

                    <CoinIcon size={14} style={{ marginLeft: 5 }} color={"var(--text-color)"} />

                    {offer.profit >= 1 && (
                        <div
                        style={{
                            padding: "0 8px",
                            borderRadius: 100,
                            background: "var(--shop-profit-background)",
                            marginLeft: 8,
                            fontSize: 9.8,
                            textTransform: "uppercase",
                            color: "#fff"
                        }}
                        >
                            выгода {offer.profit}%
                        </div>
                    )}
                </div>
            </SimpleCell>
        )
    })
    return (
        <Panel id={nav}>
            <SimpleCell
                disabled
                style={{ paddingLeft: 0 }}
                before={<BackButton onClick={() => back()} />}
            >
                <b>Магазин</b>
            </SimpleCell>

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    padding: 15
                }}
            >
                {offersRender}
            </div>
        </Panel>
    )
}