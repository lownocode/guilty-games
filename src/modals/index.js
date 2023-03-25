import React from "react"
import { ModalRoot } from "@itznevikat/router"

import { ChangeNicknameModal } from "./ChangeNicknameModal"
import { ChangeNicknameColorModal } from "./ChangeNicknameColorModal"
import { CardBonusModal } from "./CardBonusModal"
import { UserInfoModal } from "./UserInfoModal"
import { GameCheckModal } from "./GameCheckModal"

export const modals = (
    <ModalRoot>
        <ChangeNicknameModal nav={"changeNickname"} />
        <ChangeNicknameColorModal nav={"changeNicknameColor"} />
        <CardBonusModal nav={"cardBonus"} />
        <UserInfoModal nav={"userInfo"} />
        <GameCheckModal nav={"gameCheck"} />
    </ModalRoot>
)