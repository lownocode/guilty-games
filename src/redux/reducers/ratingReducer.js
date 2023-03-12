import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import bridge from "@vkontakte/vk-bridge"

import { getRunParams } from "../../functions"
import { store } from "../store"

export const getDailyRating = createAsyncThunk("rating/daily", async () => {
    const { vkToken } = store.getState().app

    return axios.post("/rating/daily", null, {
        headers: {
            "vk-params": await getRunParams(),
        }
    })
        .then(async ({ data }) => {
            const { response } = await bridge.send("VKWebAppCallAPIMethod", {
                method: "users.get",
                params: {
                    v: "5.131",
                    user_ids: data.users.map(user => user.vkId).join(","),
                    access_token: vkToken,
                    fields: "photo_200"
                }
            })

            return {
                ...data,
                users: data.users.map(user => {
                    return {
                        ...user,
                        photo: response.find(_user => _user.id === user.vkId).photo_200
                    }
                })
            }
        })
})

const ratingSlice = createSlice({
    name: "rating",
    initialState: {
        dailyRating: {
            users: []
        },
        fetchingRating: false
    },
    extraReducers: builder => builder
        .addCase(getDailyRating.pending, state => {
            state.fetchingRating = true
        })
        .addCase(getDailyRating.fulfilled, (state, action) => {
            state.fetchingRating = false
            state.dailyRating = action.payload
        })
})

export const ratingReducer = ratingSlice.reducer