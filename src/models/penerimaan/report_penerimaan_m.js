import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getReportPenerimaan = createAsyncThunk('report-penerimaan/getReportPenerimaan', async(page) => {
    try {
        const response = await instanceapi.get(`/penerimaan?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeReportPenerimaan = createAsyncThunk('report-penerimaan/storeReportPenerimaan', async(data) => {
    try {
        const response = await instanceapi.post('/penerimaan/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailReportPenerimaan = createAsyncThunk('report-penerimaan/getDetailReportPenerimaan', async(code) => {
    try {
        const response = await instanceapi.get(`/penerimaan/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const report_penerimaan_m = createSlice({
    name: 'report-penerimaan',
    initialState
})

export default report_penerimaan_m.reducer;