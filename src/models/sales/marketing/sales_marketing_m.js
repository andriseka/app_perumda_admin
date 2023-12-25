import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../../instanceapi";

const initialState = {

}

export const storeSalesMarketing = createAsyncThunk('sales-marketing/storeSalesMarketing', async(data) => {
    try {
        const response = await instanceapi.post('/sales/marketing/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const sales_marketing_m = createSlice({
    name: 'sales-marketing',
    initialState
})

export default sales_marketing_m.reducer;