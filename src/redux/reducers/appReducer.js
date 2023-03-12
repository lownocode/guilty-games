import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { getRunParams } from "../../functions"

export const getPromocodesHistory = createAsyncThunk("app/promocodes/history", async () => {
    return axios.post("/promocode/history", null, {
        headers: {
            "vk-params": await getRunParams()
        }
    })
        .then(({ data }) => data)
})

const appSlice = createSlice({
    name: "app",
    initialState: {
        promocodesHistory: [],
        vkToken: "",
    },
    reducers: {
        setVkToken: (state, action) => {
            state.vkToken = action.payload
        },
        pushPromocodeToHistory: (state, action) => {
            state.promocodesHistory.unshift(action.payload)
        }
    },
    extraReducers: builder => builder
        .addCase(getPromocodesHistory.fulfilled, (state, action) => {
            state.promocodesHistory = action.payload
        })
})

export const appReducer = appSlice.reducer
export const { setVkToken, pushPromocodeToHistory } = appSlice.actions