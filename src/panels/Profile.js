import React, { useEffect, useState, Suspense } from "react"
import bridge from "@vkontakte/vk-bridge"
import { useDispatch, useSelector } from "react-redux"
import { push } from "@itznevikat/router"

import {
	Panel,
	Avatar,
	PullToRefresh,
	PlatformProvider,
	SimpleCell,
} from "@vkontakte/vkui"

import "../styles/panels/profile.css"
import { splitSum } from "../functions"
import { CoinIcon } from "../assets"
import { getUserData } from "../redux/reducers"
import { nicknameColors, profileActionButtonsRender } from "../data"

export const Profile = ({ id }) => {
	const dispatch = useDispatch()
	const { userData, fetchingUserData } = useSelector(state => state.user)

	const [ currentUser, setCurrentUser ] = useState({})

	useEffect(() => {
		getVkUserData()
	}, [])

	const getVkUserData = () => {
		bridge.send("VKWebAppGetUserInfo").then(setCurrentUser)
	}

	return (
		<Panel id={id}>
			<SimpleCell
				disabled
				style={{ color: nicknameColors[userData.nameColors[0]] }}
				before={
					<Avatar
						size={35}
						src={currentUser.photo_max_orig}
					/>
				}
				subtitle={`Онлайн: ${userData.online ?? 0}`}
			>
				{userData.name}
			</SimpleCell>

			<PlatformProvider value="ios">
				<PullToRefresh
					onRefresh={() => dispatch(getUserData())}
					isFetching={fetchingUserData}
				>
					<div className="profile-balance-block--container">
						Ваш баланс
						<div className="profile-balance-block--amount">
							{splitSum(userData.balance)} <CoinIcon style={{ marginLeft: 10 }}/>
						</div>
					</div>

					<div className="profile-main-buttons--container">
						<div
							className="profile-main-buttons--base profile-main-buttons--left"
							onClick={() => push("/bonuses")}
						>
							Бонусы
						</div>

						<div
							className="profile-main-buttons--base profile-main-buttons--right"
							onClick={() => push("/shop")}
						>
							Магазин
						</div>
					</div>

					{profileActionButtonsRender}
				</PullToRefresh>
			</PlatformProvider>
		</Panel>
	)
}