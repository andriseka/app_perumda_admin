import React from 'react'
import ProductForm from '../../views/product/form/ProductForm'
import ProductData from '../../views/product/data/ProductData'
import ProductDataDetail from '../../views/product/data/ProductDataDetail'
import ProductSetting from '../../views/product/setting/ProductSetting'

function ProductController({ view }) {
    if (view === 'form') {
        return (
            <ProductForm />
        )
    } else if (view === 'data') {
        return (
            <ProductData />
        )
    } else if (view === 'detail') {
        return (
            <ProductDataDetail />
        )
    } else if (view === 'setting') {
        return (
            <ProductSetting />
        )
    }
}

export default ProductController
