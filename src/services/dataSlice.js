import { createSlice, configureStore } from '@reduxjs/toolkit'


const dataSlice = createSlice({
    name: 'data',
    initialState: {
        isLoading: false,
        error: null,
        data: null,
    },
    reducers: {
        getData: (state, action) => {
            state.data = action.payload.data
        }
    },
    }
);

export const { getData } = dataSlice.actions;

const dataReducer = dataSlice.reducer;

export default dataReducer














// import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

// const cryptoApiHeaders = {
//     'X-RapidAPI-Key': 'f820fcc09dmshd8ab2666bd17fb7p12bbc5jsn8460c07525f3',
//     'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
// }

// const baseUrl = 'https://coinranking1.p.rapidapi.com';

// const createRequest = (url) => ({ url, headers: cryptoApiHeaders });

// export const cryptoApi = createApi({
//     reducerPath: 'cryptoApi',
//     baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
//     endpoints: (builder) => ({
//         getCryptos: builder.query({
//             query: () => createRequest('/coins')
//         })
//     })
// });

// export const { useGetCryptosQuery } = cryptoApi;





