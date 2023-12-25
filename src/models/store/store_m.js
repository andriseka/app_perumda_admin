import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getStore = createAsyncThunk('store/getStore', async(page) => {
    try {
        const response = await instanceapi.get(`/store?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const postStore = createAsyncThunk('store/postStore', async(data) => {
    try {
        const response = await instanceapi.post('/store/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const store_m = createSlice({
    name: 'store',
    initialState
})

export default store_m.reducer;