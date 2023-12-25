import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getAllEmployeeJabatanByPosisi = createAsyncThunk('employee-jabatan/getAllEmployeeJabatanByPosisi', async(code_posisi) => {
    try {
        const response = await instanceapi.get(`/employee/jabatan/posisi/${code_posisi}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const employee_jabatan_m = createSlice({
    name: 'employee-jabatan',
    initialState
})

export default employee_jabatan_m.reducer;