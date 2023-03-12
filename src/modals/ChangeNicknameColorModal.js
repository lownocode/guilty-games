import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import {
    Button,
    ModalCard,
    Spacing,
    FormItem,
} from "@vkontakte/vkui"
import { Icon24PaletteOutline } from "@vkontakte/icons"

import "../styles/modals/change-nickname-color-modal.css"
import { CoinIcon } from "../assets"
import { nicknameColors } from "../data"
import { getRunParams } from "../functions"
import { getUserData } from "../redux/reducers"

export const ChangeNicknameColorModal = ({ nav }) => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    const [ loading, setLoading ] = useState(false)
    const [ selectedColor, setSelectedColor ] = useState(userData.nameColors[0])
    const [ selectColorStatus, setSelectColorStatus ] = useState({ status: "default" })

    const colorsRender = nicknameColors.map((color, index) => {
        return (
            <div
                className={"change-nickname-color-modal--color"}
                onClick={() => setSelectedColor(index)}
                style={{
                    background: color,
                    [index === 0 && "color"]: "var(--text-color-revert)"
                }}
            >
                <div className={index === selectedColor && "change-nickname-color-modal--color-text"}>
                    {index === selectedColor && "выбран"}
                </div>
            </div>
        )
    })

    const changeColor = async () => {
        setLoading(true)

        await axios.post("/user/changeNameColors", {
            colors: [selectedColor]
        }, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ data }) => {
                dispatch(getUserData())
                setSelectColorStatus({ ...data, status: "valid" })
            })
            .catch(({ response: { data } }) => setSelectColorStatus({ ...data, status: "error" }))
            .finally(() => setLoading(false))
    }

    return (
        <ModalCard nav={nav}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    fontWeight: "500"
                }}
            >
                <Icon24PaletteOutline style={{ marginRight: 8 }} />
                <div>
                    Смена цвета имени
                    <div
                        style={{
                            fontWeight: "400",
                            color: nicknameColors[selectedColor]
                        }}
                    >
                        Пример выбранного цвета
                    </div>
                </div>
            </div>

            <Spacing size={15} />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                    flexWrap: "wrap"
                }}
            >
                {colorsRender}
            </div>

            <Spacing size={15} />

            <FormItem
                style={{ padding: 0 }}
                bottom={selectColorStatus.message}
                status={selectColorStatus.status}
            >
                <Button
                    size={"m"}
                    stretched
                    loading={loading}
                    onClick={() => changeColor()}
                    style={{
                        background: "var(--accent)",
                        color: "#fff",
                        marginTop: 5
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        Изменить за 5 000 <CoinIcon size={14} style={{ marginLeft: 5 }}/>
                    </div>
                </Button>
            </FormItem>
        </ModalCard>
    )
}