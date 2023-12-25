import React from 'react'
import SalesData from '../../views/sales/data/SalesData'
import SalesDataDetail from '../../views/sales/data/SalesDataDetail'
import SalesRetur from '../../views/sales/retur/SalesRetur'
import SalesReturDetail from '../../views/sales/retur/SalesReturDetail'
import SalesSpoil from '../../views/sales/spoil/SalesSpoil'
import SalesSpoilDetail from '../../views/sales/spoil/SalesSpoilDetail'
import SalesForm from '../../views/sales/sales/form/SalesForm'

function SalesController({ view }) {
    if (view === 'sales-data') {
        return (
            <SalesData />
        )
    } else if (view === 'sales-detail') {
        return (
            <SalesDataDetail />
        )
    } else if (view === 'sales-form') {
        return (
            <SalesForm />
        )
    } else if (view === 'retur') {
        return (
            <SalesRetur />
        )
    } else if (view === 'retur-detail') {
        return (
            <SalesReturDetail />
        )
    } else if (view === 'spoil') {
        return (
            <SalesSpoil />
        )
    } else if (view === 'spoil-detail') {
        return (
            <SalesSpoilDetail />
        )
    }
}

export default SalesController
