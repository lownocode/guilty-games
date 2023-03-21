import React from "react"
import { useDispatch } from "react-redux"

import {
    Snackbar
} from "@vkontakte/vkui"
import {
    Icon28CheckCircleOutline,
    Icon28CancelCircleOutline
} from "@vkontakte/icons"

import { closeSnackbar } from "../redux/reducers"

export const SnackbarPopout = (props) => {
    const {
        type = "success",
        text = "Example of the text",
    } = props

    const dispatch = useDispatch()

    const icon = {
        success: <Icon28CheckCircleOutline style={{ color: "var(--green)" }} />,
        failure: <Icon28CancelCircleOutline style={{ color: "var(--red)" }} />,
    }[type]

    return (
        <Snackbar
            onClose={() => dispatch(closeSnackbar())}
            before={icon}
        >
            {text}
        </Snackbar>
    )
}