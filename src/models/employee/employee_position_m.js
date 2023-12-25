import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getAllEmployeePosition = createAsyncThunk('employee-position/getAllEmployeePosition', async() => {
    try {
        const response = await instanceapi.get('/employee/posisi/all').catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

const employee_position_m = createSlice({
    name: 'employee-position',
    initialState
})

export default employee_position_m.reducer;