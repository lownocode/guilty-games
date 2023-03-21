import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import bridge from "@vkontakte/vk-bridge"
import {
	AdaptivityProvider,
	ConfigProvider,
	AppRoot,
	SplitLayout,
	ScreenSpinner,
	useAppearance
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
import {
	getUserData,
	setLoading,
	setVkToken,
	startCardsBonusTimer
} from "./redux/reducers"
import { modals } from "./modals"
import { popouts } from "./popouts"
import { setupNavColors } from "./index"

const TABBAR_HIDE_IN_PANELS = ["/bonuses", "/shop", "/promocodes"]

export const App = () => {
	const dispatch = useDispatch()
	const location = useLocation()
	const { popout = null } = useParams()
	const { loading, snackbar } = useSelector(state => state.app)
	const appearance = useAppearance()

	const statusBarColor = getComputedStyle(document.documentElement).getPropertyValue("--background-content")
	const navbarColor = getComputedStyle(document.documentElement).getPropertyValue("--tabbar-background")

	useEffect(() => {
		getUserVkToken()
	}, [])

	useEffect(() => {
		setupNavColors(appearance, statusBarColor, navbarColor)
	}, [statusBarColor, navbarColor])

	const getUserVkToken = async () => {
		const { access_token } = await bridge.send("VKWebAppGetAuthToken", {
			app_id: 51574671,
			scope: ""
		})

		dispatch(setVkToken(access_token))
	}

	return (
		<ConfigProvider platform={"ios"}>
			<AdaptivityProvider>
				{snackbar}

				<SplitLayout
					modal={modals}
					popout={loading ? <ScreenSpinner /> : matchPopout(popout, popouts)}
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