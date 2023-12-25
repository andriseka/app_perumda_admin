import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getSupplier = createAsyncThunk('supplier/getSupplier', async(page) => {
    try {
        const response = await instanceapi.get(`/supplier?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeSupplier = createAsyncThunk('supplier/storeSupplier', async(data) => {
    try {
        const response = await instanceapi.post('/supplier/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailSupplier = createAsyncThunk('supplier/getDetailSupplier', async(code) => {
    try {
        const response = await instanceapi.get(`/supplier/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getSearchCodeNameSupplier = createAsyncThunk('supplier/getSearchCodeNameSupplier', async(code_search) => {
    try {
        const response = await instanceapi.get(`/supplier/search/code/name/${code_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateImageSupplier = createAsyncThunk('supplier/updateImageSupplier', async(data) => {
    try {
        const response = await instanceapi.post(`/supplier/update/image/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateDataSupplier = createAsyncThunk('supplier/updateDataSupplier', async(data) => {
    try {
        const response = await instanceapi.post(`/supplier/update/data/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const deleteSupplier = createAsyncThunk('supplier/deleteSupplier', async(code) => {
    try {
        const response = await instanceapi.delete(`/supplier/delete/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const supplier_m = createSlice({
    name: 'supplier',
    initialState
})

export default supplier_m.reducer;