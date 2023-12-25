import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getStoreCategory  = createAsyncThunk('store-category/getStoreCategory', async(page) => {
    try {
        const response = await instanceapi.get(`/store/category?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const store_category_m = createSlice({
    name: 'store-category',
    initialState
})

export default store_category_m.reducer;