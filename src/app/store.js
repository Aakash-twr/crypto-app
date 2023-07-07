import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../services/dataSlice";
import newsReducer from "../services/newsSlice";
// import { cryptoApi } from "../services/cryptoApi";

export const store = configureStore({
    reducer: {
        dataReducer,
        newsReducer
    }
});


export default store;