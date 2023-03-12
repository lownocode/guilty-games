import React, { useEffect } from "react"
import {
	AdaptivityProvider,
	ConfigProvider,
	AppRoot,
	SplitLayout,
} from "@vkontakte/vkui"
import {
	Match,
	Root,
	View,
	Epic,
	useLocation,
	useParams,
	matchPopout
} from "@itznevikat/router"
import { useDispatch } from "react-redux"
import bridge from "@vkontakte/vk-bridge"

import "./root.css"
import "@vkontakte/vkui/dist/vkui.css"

import { Tabbar } from "./components"
import {
	Profile,
	Rating,
	Games,
	Clan,
	Bonuses,
	Shop,
	Promocodes,
} from "./panels"
import { getUserData, setVkToken } from "./redux/reducers"
import { modals } from "./modals"
import { popouts } from "./popouts"

const TABBAR_HIDE_IN_PANELS = ["/bonuses", "/shop", "/promocodes"]

export const App = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const { popout = null } = useParams()

	useEffect(() => {
		dispatch(getUserData())

		getUserVkToken()
	}, [])

	const getUserVkToken = async () => {
		const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
			app_id: 51574671,
			scope: ""
		})

		dispatch(setVkToken(access_token))
	}

	return (
		<ConfigProvider>
			<AdaptivityProvider>
				<SplitLayout
					modal={modals}
					popout={matchPopout(popout, popouts)}
				/>

				<AppRoot>
					<Match disableSetLocation>
						<Root nav="/">
							<View nav="/">
								<Profile id="profile" nav="/" />
								<Rating id="rating" nav="/rating" />
								<Games id="games" nav="/games" />
								<Clan id="clan" nav="/clan" />
								<Bonuses id="bonuses" nav="/bonuses" />
								<Shop id="shop" nav="/shop" />
								<Promocodes id="promocodes" nav="/promocodes" />
							</View>
						</Root>
					</Match>

					{
						!TABBAR_HIDE_IN_PANELS.includes(location.pathname) && (
							<Epic tabbar={<Tabbar />} />
						)
					}
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	)
}