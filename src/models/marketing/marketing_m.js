import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getMarketing = createAsyncThunk('marketing/getMarketing', async(page) => {
    try {
        const response = await instanceapi.get(`/marketing?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailMarketing = createAsyncThunk('marketing/getDetailMarketing', async(code) => {
    try {
        const response = await instanceapi.get(`/marketing/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeMarketing = createAsyncThunk('marketing/storeMarketing', async(data) => {
    try {
        const response = await instanceapi.post('/marketing/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateImageMarketing = createAsyncThunk('marketing/updateImageMarketing', async(data) => {
    try {
        const response = await instanceapi.post(`/marketing/update/image/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateDataMarketing = createAsyncThunk('marketing/updateDataMarketing', async(data) => {
    try {
        const response = await instanceapi.post(`/marketing/update/data/${data.code}`,data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getSearchMarketingByCodeName = createAsyncThunk('marketing/getSearchMarketingByCodeName', async(code_name_search) => {
    try {
        const response = await instanceapi.get(`/marketing/search/code/name/${code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const marketing_m = createSlice({
    name: 'marketing',
    initialState
})

export default marketing_m.reducer;