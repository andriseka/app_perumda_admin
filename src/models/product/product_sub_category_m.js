import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from "../instanceapi";

const initialState = {

}

export const getProductSubCategory = createAsyncThunk('product-sub-category/getProductSubCategory', async(page) => {
    try {
        const response = await instanceapi.get(`/product/sub-category?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getProductSubCategoryByCategory = createAsyncThunk('product-sub-category/getProductSubCategoryByCategory', async(code) => {
    try {
        const response = await instanceapi.get(`/product/sub-category/category/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeProductSubCategory = createAsyncThunk('product-sub-category/storeProductSubCategory', async(data) => {
    try {
        const response = await instanceapi.post('/product/sub-category/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

// search and filter
export const getSearchProductSubCategoryByCodeName = createAsyncThunk('product-sub-category/getSearchProductSubCategoryByCodeName', async(code_name_search) => {
    try {
        const response = await instanceapi.get(`/product/sub-category/search/code/name/${code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getSearchProductSubCategoryByCategoryCodeName = createAsyncThunk('product-sub-category/getSearchProductSubCategoryByCategoryCodeName', async(data) => {
    try {
        const response = await instanceapi.get(`/product/sub-category/search/category/code/name/${data.code_category}/${data.code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const product_sub_category_m = createSlice({
    name: 'product-sub-category',
    initialState
})

export default product_sub_category_m.reducer;