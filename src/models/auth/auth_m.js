import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const loginUser = createAsyncThunk('auth/loginUser', async(data) => {
    try {
        const response = await instanceapi.post('/user/login', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async(username) => {
    try {
        const response = await instanceapi.post(`/user/logout/${username}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
});

const auth_m = createSlice({
    name: 'auth',
    initialState
})

export default auth_m.reducer;