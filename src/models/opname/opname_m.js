import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getOpname = createAsyncThunk('opname/getOpname', async(page) => {
    try {
        const response = await instanceapi.get(`/opname?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeOpname = createAsyncThunk('opname/storeOpname', async(data) => {
    try {
        const response = await instanceapi.post('/opname/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailOpname = createAsyncThunk('opname/getDetailOpname', async(code) => {
    try {
        const response = await instanceapi.get(`/opname/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const validasiOpname = createAsyncThunk('opname/validasiOpname', async(code) => {
    try {
        const response = await instanceapi.post(`/opname/validasi/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getOpnameByStatusValidasi = createAsyncThunk('opname/getOpnameByStatusValidasi', async(data) => {
    try {
        const response = await instanceapi.get(`/opname/status/validasi/${data.validasi}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getOpnameByStatusPelaksanaan = createAsyncThunk('opname/getOpnameByStatusPelaksanaan', async(data) => {
    try {
        const response = await instanceapi.get(`/opname/status/pelaksanaan/${data.status_pelaksanaan}?page=${data.page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateOpnameData = createAsyncThunk('opname/updateOpnameData', async(data) => {
    try {
        const response = await instanceapi.post(`/opname/update/data/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const opname_m = createSlice({
    name: 'opname',
    initialState
})

export default opname_m.reducer;