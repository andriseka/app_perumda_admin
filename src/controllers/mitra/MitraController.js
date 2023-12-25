import React from 'react'
import MitraSupplierForm from '../../views/mitra/supplier/form/MitraSupplierForm'
import MitraSupplierData from '../../views/mitra/supplier/data/MitraSupplierData'
import MitraSupplierDetail from '../../views/mitra/supplier/data/MitraSupplierDetail'
import MitraMarketingForm from '../../views/mitra/marketing/form/MitraMarketingForm'
import MitraMarketingData from '../../views/mitra/marketing/data/MitraMarketingData'
import MitraMarketingDetail from '../../views/mitra/marketing/data/MitraMarketingDetail'

function MitraController({ view }) {
    if (view === 'supplier-form') {
        return (
            <MitraSupplierForm />
        )
    } else if (view === 'supplier-data') {
        return (
            <MitraSupplierData />
        )
    } else if (view === 'supplier-data-detail') {
        return (
            <MitraSupplierDetail />
        )
    } else if (view === 'marketing-form') {
        return (
            <MitraMarketingForm />
        )
    } else if (view === 'marketing-data') {
        return (
            <MitraMarketingData />
        )
    } else if (view === 'marketing-data-detail') {
        return (
            <MitraMarketingDetail />
        )
    }
}

export default MitraController
