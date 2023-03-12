import React from "react"
import { ModalRoot } from "@itznevikat/router"

import { ChangeNicknameModal } from "./ChangeNicknameModal"
import {ChangeNicknameColorModal} from "./ChangeNicknameColorModal"

export const modals = (
    <ModalRoot>
        <ChangeNicknameModal nav="changeNickname" />
        <ChangeNicknameColorModal nav="changeNicknameColor" />
    </ModalRoot>
)