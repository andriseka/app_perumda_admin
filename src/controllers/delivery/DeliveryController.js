import React from 'react'
import DeliveryData from '../../views/delivery/data/DeliveryData'
import DeliveryDataDetail from '../../views/delivery/data/DeliveryDataDetail'
import DeliveryRetur from '../../views/delivery/retur/DeliveryRetur'
import DeliveryReturDetail from '../../views/delivery/retur/DeliveryReturDetail'
import DeliverySpoil from '../../views/delivery/spoil/DeliverySpoil'
import DeliverySpoilDetail from '../../views/delivery/spoil/DeliverySpoilDetail'

function DeliveryController({ view }) {
    if (view === 'delivery') {
        return (
            <DeliveryData />
        )
    } else if (view === 'delivery-detail') {
        return (
            <DeliveryDataDetail />
        )
    } else if (view === 'retur') {
        return (
            <DeliveryRetur />
        )
    } else if (view === 'retur-detail') {
        return (
            <DeliveryReturDetail />
        )
    } else if (view === 'spoil') {
        return (
            <DeliverySpoil />
        )
    } else if (view === 'spoil-detail') {
        return (
            <DeliverySpoilDetail />
        )
    }
}

export default DeliveryController
