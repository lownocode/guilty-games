import React from "react"
import {
    Snackbar
} from "@vkontakte/vkui"
import {
    Icon28CheckCircleOutline,
    Icon28CancelCircleOutline
} from "@vkontakte/icons"

export const SnackbarPopout = (props) => {
    const {
        type = "success",
        text = "Example of the text",
        onClose
    } = props

    const icon = {
        success: <Icon28CheckCircleOutline style={{ color: "var(--green)" }} />,
        failure: <Icon28CancelCircleOutline style={{ color: "var(--red)" }} />,
    }[type]

    return (
        <Snackbar
            onClose={onClose}
            before={icon}
        >
            {text}
        </Snackbar>
    )
}