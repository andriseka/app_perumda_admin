import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getEmployee = createAsyncThunk('employee/getEmployee', async(page) => {
    try {
        const response = await instanceapi.get(`/employee?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeEmployee = createAsyncThunk('employee/storeEmployee', async(data) => {
    try {
        const response = await instanceapi.post('/employee/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailEmployee = createAsyncThunk('employee/getDetailEmployee', async(username) => {
    try {
        const response = await instanceapi.get(`/employee/detail/${username}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateEmployee = createAsyncThunk('employee/updateEmployee', async(data) => {
    try {
        const response = await instanceapi.post(`/employee/update/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateEmployeePhoto = createAsyncThunk('employee/updateEmployeePhoto', async(data) => {
    try {
        const response = await instanceapi.post(`/employee/photo/update/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const deleteEmployee = createAsyncThunk('employee/deleteEmployee', async(code) => {
    try {
        const response = await instanceapi.delete(`/employee/delete/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const employee_m = createSlice({
    name: 'employee',
    initialState
})

export default employee_m.reducer;