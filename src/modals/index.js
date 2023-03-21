import React from "react"
import { ModalRoot } from "@itznevikat/router"

import { ChangeNicknameModal } from "./ChangeNicknameModal"
import { ChangeNicknameColorModal } from "./ChangeNicknameColorModal"
import { CardBonusModal } from "./CardBonusModal"
import { ReferralModal } from "./ReferralModal"

export const modals = (
    <ModalRoot>
        <ChangeNicknameModal nav={"changeNickname"} />
        <ChangeNicknameColorModal nav={"changeNicknameColor"} />
        <CardBonusModal nav={"cardBonus"} />
        <ReferralModal nav={"referral"} />
    </ModalRoot>
)