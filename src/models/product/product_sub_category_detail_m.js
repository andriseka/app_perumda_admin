import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instanceapi from '../instanceapi'

const initialState = {

}

export const getProductSubCategoryDetail = createAsyncThunk('product-sub-category-detail/getProductSubCategoryDetail', async(page) => {
    try {
        const response = await instanceapi.get(`/product/sub-category-detail?page=${page}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const getProductSubCategoryDetailBySubCategory = createAsyncThunk('product-sub-category-detail/getProductSubCategoryDetailBySubCategory', async(code) => {
    try {
        const response = await instanceapi.get(`/product/sub-category-detail/sub-category/${code}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

export const storeProductSubCategoryDetail = createAsyncThunk('product-sub-category-detail/storeProductSubCategoryDetail', async(data) => {
    try {
        const response = await instanceapi.post('/product/sub-category-detail/store', data).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

// search and filter
export const getSearchProductSubCategoryDetailBySubCategoryCodeName = createAsyncThunk('product-sub-category/getSearchProductSubCategoryDetailBySubCategoryCodeName', async(data) => {
    try {
        const response = await instanceapi.get(`/product/sub-category-detail/search/sub-category/sub/code/name/${data.code_sub_category}/${data.code_name_search}`).catch((err) => {});
        return response.data;
    } catch (error) {
        
    }
})

const product_sub_category_detail_m = createSlice({
    name: 'product-sub-category-detail',
    initialState,
})

export default product_sub_category_detail_m.reducer;