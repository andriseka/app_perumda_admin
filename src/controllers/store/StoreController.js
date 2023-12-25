import React from 'react'
import StoreData from '../../views/mitra/store/data/StoreData'
import StoreForm from '../../views/mitra/store/form/StoreForm'

function StoreController({ view }) {
    if (view === 'store-data') {
        return (
            <StoreData />
        )
    } else if(view === 'store-form') {
        return (
            <StoreForm />
        )
    }
}

export default StoreController
