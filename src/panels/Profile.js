import React, { useEffect, useState } from "react"
import bridge from "@vkontakte/vk-bridge"
import { useDispatch, useSelector } from "react-redux"
import { push } from "@itznevikat/router"

import {
	Panel,
	Avatar,
	PullToRefresh,
	SimpleCell,
} from "@vkontakte/vkui"

import "../styles/panels/profile.css"
import { formatNumToKFormat, splitSum } from "../functions"
import { CoinIcon } from "../assets"
import { getUserData } from "../redux/reducers"
import { config, nicknameColors, profileActionButtonsRender } from "../data"

export const Profile = ({ id }) => {
	const dispatch = useDispatch()
	const { userData, fetchingUserData } = useSelector(state => state.user)

	const [ currentUser, setCurrentUser ] = useState({})

	useEffect(() => {
		getVkUserData()
		dispatch(getUserData())
	}, [])

	const getVkUserData = () => {
		bridge.send("VKWebAppGetUserInfo").then(setCurrentUser)
	}

	const renderStats = () => {
		return (
			<div>
				<div
					className={"defaultFlexbox"}
					style={{
						background: "var(--card-background)",
						padding: "15px 10px",
						borderRadius: "12px 12px 8px 8px",
						margin: "0 18px 5px 18px",
						justifyContent: "space-around",
						fontWeight: "300",
						fontSize: 14
					}}
				>
					<div style={{ textAlign: "center", color: "var(--text-color)" }}>
						Выиграно сегодня
						<div style={{ fontWeight: "500" }}>
							{formatNumToKFormat(0)} {config.currency}
						</div>
					</div>

					<div style={{ width: 1, height: 20, background: "var(--divider-color)" }} />

					<div style={{ textAlign: "center", color: "var(--text-color)" }}>
						Проиграно сегодня
						<div style={{ fontWeight: "500" }}>
							{splitSum(0)} {config.currency}
						</div>
					</div>
				</div>

				<div
					className={"defaultFlexbox"}
					style={{
						background: "var(--card-background)",
						padding: "15px 10px",
						borderRadius: "8px 8px 12px 12px",
						margin: "0 18px",
						justifyContent: "space-around",
						fontWeight: "300",
						fontSize: 14
					}}
				>
					<div style={{ textAlign: "center", color: "var(--text-color)" }}>
						Всего наиграно
						<div style={{ fontWeight: "500" }}>
							{formatNumToKFormat(0)} {config.currency}
						</div>
					</div>

					<div style={{ width: 1, height: 20, background: "var(--divider-color)" }} />

					<div style={{ textAlign: "center", color: "var(--text-color)" }}>
						Макс. выигрыш
						<div style={{ fontWeight: "500" }}>
							{formatNumToKFormat(0)} {config.currency}
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<Panel id={id}>
			<SimpleCell
				disabled
				className={"defaultHeaderStyle"}
				style={{
					color: nicknameColors[userData.nameColors[0]],
				}}
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

				<div className={"profile-actions-header"}>
					управление
				</div>
				{profileActionButtonsRender}

				<div style={{ marginTop: 15 }} />

				<div className={"profile-actions-header"}>
					статистика
				</div>

				{renderStats()}
			</PullToRefresh>
		</Panel>
	)
}