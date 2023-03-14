import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

import { getRunParams } from "../../functions"
import { SnackbarPopout } from "../../popouts/SnackbarPopout"

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
        loading: true,
        snackbar: null
    },
    reducers: {
        setVkToken: (state, action) => {
            state.vkToken = action.payload
        },
        pushPromocodeToHistory: (state, action) => {
            state.promocodesHistory.unshift(action.payload)
        },
        setLoading: state => {
            state.loading = false
        },
        openSnackbar: (state, action) => {
            state.snackbar = null
            state.snackbar = <SnackbarPopout {...action.payload} />
        },
        closeSnackbar: state => {
            state.snackbar = null
        }
    },
    extraReducers: builder => builder
        .addCase(getPromocodesHistory.fulfilled, (state, action) => {
            state.promocodesHistory = action.payload
        })
})

export const appReducer = appSlice.reducer
export const {
    setVkToken,
    pushPromocodeToHistory,
    setLoading,
    openSnackbar,
    closeSnackbar
} = appSlice.actions