import { configureStore } from "@reduxjs/toolkit"

import {
    appReducer,
    ratingReducer,
    userReducer
} from "./reducers"

export const store = configureStore({
    reducer: {
        user: userReducer,
        rating: ratingReducer,
        app: appReducer
    }
})