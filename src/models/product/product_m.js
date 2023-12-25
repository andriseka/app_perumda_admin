import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getProduct = createAsyncThunk('product/getProduct', async(page) => {
    try {
        const response = await instanceapi.get(`/product?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeProduct = createAsyncThunk('product/storeProduct', async(data) => {
    try {
        const response = await instanceapi.post('/product/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getDetailProduct = createAsyncThunk('product/getDetailProduct', async(code) => {
    try {
        const response = await instanceapi.get(`/product/detail/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateProduct = createAsyncThunk('product/updateProduct', async(data) => {
    try {
        const response = await instanceapi.post(`/product/update/${data.key}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const updateProductPrice = createAsyncThunk('product/updateProductPrice', async(data) => {
    try {
        const response = await instanceapi.post(`/product/update/price/${data.code}`, data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

// search and filter
export const getProductByMerkCodeNameSearch = createAsyncThunk('product/getProductByMerkCodeNameSearch', async(data) => {
    try {
        const response = await instanceapi.get(`/product/search/merk/code/name/${data.code_merk}/${data.code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getProductByCategory = createAsyncThunk('product/getProductByCategory', async(code_category) => {
    try {
        const response = await instanceapi.get(`/product/filter/category/${code_category}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const product_m = createSlice({
    name: 'product',
    initialState
})

export default product_m.reducer;