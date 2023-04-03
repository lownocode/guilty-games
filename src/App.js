import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ErrorBoundary } from "react-error-boundary"
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
	WheelGame, Error
} from "./panels"
import { setVkToken } from "./redux/reducers"
import { modals } from "./modals"
import { popouts } from "./popouts"
import { setupNavColors } from "./index"

const TABBAR_SHOWN_IN_PANELS = ["/", "/rating", "/clan", "/games"]

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
					popout={loading ? <ScreenSpinner/> : matchPopout(popout, popouts)}
				/>

				<AppRoot>
					<ErrorBoundary FallbackComponent={Error}>
						<Match disableSetLocation>
							<Root nav="/">
								<View nav="/">
									<Profile nav="/"/>
									<Rating nav="/rating"/>
									<Games nav="/games"/>
									<Clan nav="/clan"/>

									<Bonuses nav="/bonuses"/>
									<Shop nav="/shop"/>
									<Promocodes nav="/promocodes"/>

									<View nav={"/game"}>
										<WheelGame nav={"/wheel"} />
									</View>
								</View>
							</Root>
						</Match>

						<Tabbar
							hide={!TABBAR_SHOWN_IN_PANELS.includes(location.pathname)}
						/>
					</ErrorBoundary>
				</AppRoot>
			</AdaptivityProvider>
		</ConfigProvider>
	)
}