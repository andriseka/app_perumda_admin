import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getPurchaseTotal = createAsyncThunk('purchase-total/getPurchaseTotal', async(page) => {
    try {
        const response = await instanceapi.get(`/purchase/total?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailPurchaseTotal = createAsyncThunk('purchase-total/getDetailPurchaseTotal', async(code) => {
    try {
        const response = await instanceapi.get(`/purchase/total/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getPurchaseTotalBySistemPembayaran = createAsyncThunk('purchase-total/getPurchaseTotalBySistemPembayaran', async(data) => {
    try {
        const response = await instanceapi.get(`/purchase/total/sistem-pembayaran/${data.status}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getPurchaseTotalByStatusPenerimaan = createAsyncThunk('purchase-total/getPurchaseTotalByStatusPenerimaan', async(data) => {
    try {
        const response = await instanceapi.get(`/purchase/total/penerimaan/${data.status_penerimaan}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getPurchaseTotalTempoDetail = createAsyncThunk('purchase-total/getPurchaseTotalTempoDetail', async(code_tr) => {
    try {
        const response = await instanceapi.get(`/purchase/tempo/detail/${code_tr}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storePurchaseTotal = createAsyncThunk('purchase-total/storePurchaseTotal', async(data) => {
    try {
        const response = await instanceapi.post('/purchase/total/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const purchase_total_m = createSlice({
    name: 'purchase-total',
    initialState
})

export default purchase_total_m.reducer;

