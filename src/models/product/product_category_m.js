import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getProductCategory = createAsyncThunk('product-category/getProductCategory', async(page) => {
    try {
        const response = await instanceapi.get(`/product/category?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeProductCategory = createAsyncThunk('product-category/storeProductCategory', async(data) => {
    try {
        const response = await instanceapi.post('/product/category/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

// search and filter
export const getSearchCategoryByCodeName = createAsyncThunk('product-category/getSearchCategoryByCodeName', async(code_name_search) => {
    try {
        const response = await instanceapi.get(`/product/category/search/code/name/${code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const product_category_m = createSlice({
    name: 'product-category',
    initialState
})

export default product_category_m.reducer;