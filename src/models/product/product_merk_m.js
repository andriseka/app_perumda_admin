import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getProductMerk = createAsyncThunk('product-merk/getProductMerk', async(page) => {
    try {
        const response = await instanceapi.get(`/product/merk?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeProductMerk = createAsyncThunk('product-merk/storeProductMerk', async(data) => {
    try {
        const response = await instanceapi.post('/product/merk/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getProductMerkByCategory = createAsyncThunk('product-merk/getProductMerkByCategory', async(code_category) => {
    try {
        const response = await instanceapi.get(`/product/merk/category/${code_category}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getSearchProductMerk = createAsyncThunk('product-merk/getSearchProductMerk', async(name) => {
    try {
        const response = await instanceapi.get(`/product/merk/search/name/${name}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

// search and filter
export const getSearchProductMerkByCategoryCodeName = createAsyncThunk('product-merk/getSearchProductMerkByCategoryCodeName', async(data) => {
    try {
        const response = await instanceapi.get(`/product/merk/search/category/code/name/${data.code_category}/${data.code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const product_merk_m = createSlice({
    name: 'product-merk',
    initialState
})

export default product_merk_m.reducer;