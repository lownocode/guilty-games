import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"

import {
    ModalCard,
    SimpleCell,
    Input,
    Spacing,
    Button,
    FormItem,
    FormLayout
} from "@vkontakte/vkui"
import {
    Icon24PenOutline
} from "@vkontakte/icons"

import { CoinIcon } from "../assets"
import { getRunParams } from "../functions"
import { getUserData } from "../redux/reducers"

export const ChangeNicknameModal = ({ nav }) => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)

    const [ loading, setLoading ] = useState(false)
    const [ nickname, setNickname ] = useState(userData.name)
    const [ nicknameInputStatus, setNicknameInputStatus ] = useState({ status: "default" })

    const changeNickname = async () => {
        setLoading(true)

        await axios.post("/user/changeNickname", {
            nickname: nickname
        }, {
            headers: {
                "vk-params": await getRunParams()
            }
        })
            .then(({ data }) => {
                dispatch(getUserData())
                setNicknameInputStatus({ ...data, status: "valid" })
            })
            .catch(({ response: { data } }) => setNicknameInputStatus({ ...data, status: "error" }))
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
                <Icon24PenOutline style={{ marginRight: 8 }} />
                Смена имени
            </div>

            <SimpleCell
                subtitle={"Текущий никнейм"}
                style={{
                    background: "var(--card-background)",
                    borderRadius: 12,
                    marginTop: 15
                }}
                disabled
            >
                {userData.name}
            </SimpleCell>

            <Spacing size={15} />

            <FormLayout>
                <FormItem
                    style={{ padding: 0 }}
                    bottom={nicknameInputStatus.message}
                    status={nicknameInputStatus.status}
                >
                    <Input
                        value={nickname}
                        onChange={event => setNickname(event.target.value)}
                        type="text"
                        placeholder={"Введите новый никнейм"}
                    />
                </FormItem>
            </FormLayout>

            <Spacing size={15} />

            <Button
                size={"m"}
                loading={loading}
                onClick={() => changeNickname()}
                style={{
                    background: "var(--accent)",
                    color: "#fff"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    Изменить за 3 000 <CoinIcon size={14} style={{ marginLeft: 5 }}/>
                </div>
            </Button>

        </ModalCard>
    )
}