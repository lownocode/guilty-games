import React from "react"
import ReactDOM from "react-dom"
import bridge from "@vkontakte/vk-bridge"
import { Provider } from "react-redux"
import axios from "axios"

import { store } from "./redux/store"
import { App } from "./App"

axios.defaults.baseURL = "https://zkno.ru:3000/api"
axios.defaults.headers["Content-Type"] = "application/json"

bridge.send("VKWebAppInit")

export const setupNavColors = async (appearance, statusBarColor, navbarColor) => {
    await bridge.send("VKWebAppSetViewSettings", {
        status_bar_style: appearance,
        action_bar_color: statusBarColor,
        navigation_bar_color: navbarColor
    })
}

const root = document.getElementById("root")
const app = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(app, root)