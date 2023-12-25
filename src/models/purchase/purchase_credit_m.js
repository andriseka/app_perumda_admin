import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const updatePurchaseCredit = createAsyncThunk('purchase-creadit/updatePurchaseCredit', async(data) => {
    try {
        const response = await instanceapi.post(`/purchase/tempo/update/${data.code_purchase_total}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const purchase_credit_m = createSlice({
    name: 'purchase-credit',
    initialState
})

export default purchase_credit_m.reducer;