import { createSlice } from '@reduxjs/toolkit'

const newsSlice = createSlice({
    name: "news",
    initialState: {
        isLoading: false,
        error: null,
        data: null,
    },
    reducers: {
        getNews: (state, action) => {
            state.data = action.payload.data
        }
    },
})

export const { getNews } = newsSlice.actions;

const newsReducer = newsSlice.reducer;

export default newsReducer;