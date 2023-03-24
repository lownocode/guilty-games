import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getRunParams } from "../../functions"
import { store } from "../store"
import { setLoading } from "./appReducer"

export const getUserData = createAsyncThunk("user/getData", async () => {
    return axios.post("/user", null, {
        headers: {
            "vk-params": await getRunParams(),
        }
    })
        .then(({ data }) => {
            store.dispatch(setLoading(false))
            store.dispatch(startCardsBonusTimer())

            return data
        })
})

export const startCardsBonusTimer = () => (dispatch) => {
    let interval = null

    const { cardsBonusTimer } = store.getState().user

    if (cardsBonusTimer) return

    clearInterval(interval)

    interval = setInterval(() => {
        dispatch(decrementCardBonusTimer())
        const { userData } = store.getState().user

        if (userData.bonusesAvailableAt.cards <= 0) {
            clearInterval(interval)
        }
    }, 1000)
    dispatch(setCardsBonusTimer(true))
}

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {
            nameColors: [0],
            name: "Пользователь",
            bonusesAvailableAt: {
                cards: 0
            },
            stats: {},
            nameColor: 0
        },
        fetchingUserData: false,
        cardsBonusTimer: false
    },
    reducers: {
        decrementCardBonusTimer: state => {
            state.userData.bonusesAvailableAt.cards -= 1

            if (state.userData.bonusesAvailableAt.cards <= 0) {
                state.cardsBonusTimer = false
            }
        },
        setCardsBonusTimer: (state, action) => {
            state.cardsBonusTimer = action.payload
        }
    },
    extraReducers: builder => builder
        .addCase(getUserData.pending, state => {
            state.fetchingUserData = true
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            state.userData = action.payload
            state.fetchingUserData = false
        })
})

export const {
    decrementCardBonusTimer,
    setCardsBonusTimer
} = userSlice.actions
export const userReducer = userSlice.reducer