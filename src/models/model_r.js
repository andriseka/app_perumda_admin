import { combineReducers } from "@reduxjs/toolkit";
import product_category_m from "./product/product_category_m";
import product_m from "./product/product_m";
import product_sub_category_m from "./product/product_sub_category_m";
import product_sub_category_detail_m from "./product/product_sub_category_detail_m";
import auth_m from "./auth/auth_m";
import employee_m from "./employee/employee_m";
import supplier_m from "./supplier/supplier_m";
import employee_position_m from "./employee/employee_position_m";
import employee_jabatan_m from "./employee/employee_jabatan_m";
import marketing_m from "./marketing/marketing_m";
import product_merk_m from "./product/product_merk_m";
import purchase_total_m from "./purchase/purchase_total_m";
import purchase_void_m from "./purchase/purchase_void_m";
import purchase_credit_m from "./purchase/purchase_credit_m";
import report_penerimaan_m from "./penerimaan/report_penerimaan_m";
import opname_m from "./opname/opname_m";
import store_category_m from "./store/store_category_m";
import store_m from "./store/store_m";
import sales_marketing_m from "./sales/marketing/sales_marketing_m";

const model_r = combineReducers({
    auth : auth_m,
    // employee
    employee : employee_m,
    employee_position : employee_position_m,
    employee_jabatan : employee_jabatan_m,

    // toko
    store_category : store_category_m,
    store : store_m,

    // supplier
    supplier : supplier_m,

    // marketing
    marketing : marketing_m,

    // product
    product_category : product_category_m,
    product_sub_category : product_sub_category_m,
    product_sub_category_detail : product_sub_category_detail_m,
    product_merk : product_merk_m,
    product : product_m,

    // purchase
    purchase_total : purchase_total_m,
    purchase_void : purchase_void_m,
    purchase_credit : purchase_credit_m,

    // opname
    opname: opname_m,

    // sales marketing
    sales_marketing : sales_marketing_m,

    // report
    report_penerimaan : report_penerimaan_m
});

export default model_r;