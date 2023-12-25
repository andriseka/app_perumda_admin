import React from 'react'
import MasterProductCategoryData from '../../views/product/master/category/data/MasterProductCategoryData'
import MasterProductCategoryForm from '../../views/product/master/category/form/MasterProductCategoryForm'
import MasterProductSubCategoryData from '../../views/product/master/sub_category/data/MasterProductSubCategoryData'
import MasterProductSubCategoryForm from '../../views/product/master/sub_category/form/MasterProductSubCategoryForm'
import MasterProductDetailSubCategoryData from '../../views/product/master/detail_sub_category/data/MasterProductDetailSubCategoryData'
import MasterProductDetailSubCategoryForm from '../../views/product/master/detail_sub_category/form/MasterProductDetailSubCategoryForm'
import ProductMerkData from '../../views/product/master/merk/data/ProductMerkData'
import ProductMerkForm from '../../views/product/master/merk/form/ProductMerkForm'

function MasterProductController({ view }) {
    if (view === 'category-form') {
        return (
            <MasterProductCategoryForm />
        )
    } else if (view === 'category-data') {
        return (
            <MasterProductCategoryData />
        )
    } else if (view === 'sub-category-form') {
        return (
            <MasterProductSubCategoryForm />
        )
    } else if (view === 'sub-category-data') {
        return (
            <MasterProductSubCategoryData />
        )
    } else if (view === 'detail-sub-category-form') {
        return (
            <MasterProductDetailSubCategoryForm />
        )
    } else if (view === 'detail-sub-category-data') {
        return (
            <MasterProductDetailSubCategoryData />
        )
    } else if (view === 'merk-data') {
        return (
            <ProductMerkData />
        )
    } else if (view === 'merk-form') {
        return (
            <ProductMerkForm />
        )
    }
}

export default MasterProductController
