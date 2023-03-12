import axios from "axios"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { getRunParams } from "../../functions"

export const getUserData = createAsyncThunk("user/getData", async () => {
    return axios.post("/user", null, {
        headers: {
            "vk-params": await getRunParams(),
        }
    })
        .then(({ data }) => { return data })
})

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {
            nameColors: [0]
        },
        fetchingUserData: false,
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

export const userReducer = userSlice.reducer