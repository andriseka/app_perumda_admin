import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getPurchaseVoid = createAsyncThunk('purchase-void/getPurchaseVoid', async(page) => {
    try {
        const response = await instanceapi.get(`/purchase/void?page=${page}`).catch((err) => {});
        return response.data
    } catch (error) {
        
    }
})

export const storePurchaseVoid = createAsyncThunk('purchase-void/storePurchaseVoid', async(data) => {
    try {
        const response = await instanceapi.post('/purchase/void/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const purchase_void_m = createSlice({
    name: 'purchase-void',
    initialState
})

export default purchase_void_m.reducer;