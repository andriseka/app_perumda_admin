import React from 'react'
import Stock from '../../views/warehouse/stock/Stock'
import Spoil from '../../views/warehouse/spoil/Spoil'
import SpoilDetail from '../../views/warehouse/spoil/SpoilDetail'
import Opname from '../../views/warehouse/opname/Opname'
import OpnameDetail from '../../views/warehouse/opname/OpnameDetail'
import PurchaseData from '../../views/warehouse/purchase/data/PurchaseData'
import PurchaseForm from '../../views/warehouse/purchase/form/PurchaseForm'
import PurchaseVoid from '../../views/warehouse/purchase/void/PurchaseVoid'
import PurchaseTempo from '../../views/warehouse/purchase/tempo/PurchaseTempo'
import PurchaseTempoDetail from '../../views/warehouse/purchase/tempo/PurchaseTempoDetail'
import PurchaseDataDetail from '../../views/warehouse/purchase/data/PurchaseDataDetail'
import PenerimaanData from '../../views/warehouse/penerimaan/PenerimaanData'
import PenerimaaanDetail from '../../views/warehouse/penerimaan/PenerimaaanDetail'
import ReportPenerimaan from '../../views/warehouse/penerimaan/ReportPenerimaan'
import ReportPenerimaanDetail from '../../views/warehouse/penerimaan/ReportPenerimaanDetail'
import OpnameForm from '../../views/warehouse/opname/OpnameForm'
import OpnameSchedule from '../../views/warehouse/opname/OpnameSchedule'
import OpnameValidasi from '../../views/warehouse/opname/OpnameValidasi'
import OpnameData from '../../views/warehouse/opname/OpnameData'
import OpnameTerlaksana from '../../views/warehouse/opname/OpnameTerlaksana'
import OpnameTerlaksanaValidasi from '../../views/warehouse/opname/OpnameTerlaksanaValidasi'

function WarehouseController({ view }) {
    if (view === 'purchase-data') {
        return (
            <PurchaseData />
        )
    } else if (view === 'purchase-data-detail') {
        return (
            <PurchaseDataDetail />
        )
    } else if (view === 'purchase-form') {
        return (
            <PurchaseForm />
        )
    } else if(view === 'purchase-void-data') {
        return (
            <PurchaseVoid />
        )
    } else if (view === 'purchase-tempo-data') {
        return (
            <PurchaseTempo />
        )
    } else if (view === 'purchase-tempo-detail') {
        return (
            <PurchaseTempoDetail />
        )
    } else if (view === 'penerimaan-data') {
        return (
            <PenerimaanData />
        )
    } else if (view === 'penerimaan-detail') {
        return (
            <PenerimaaanDetail />
        )
    } else if (view === 'penerimaan-report') {
        return (
            <ReportPenerimaan />
        )
    } else if (view === 'penerimaan-report-detail') {
        return (
            <ReportPenerimaanDetail />
        )
    } else if (view === 'stock') {
        return (
            <Stock />
        )
    } else if (view === 'spoil') {
        return (
            <Spoil />
        )
    } else if (view === 'spoil-detail') {
        return (
            <SpoilDetail />
        )
    } else if (view === 'opname-jadwal-form') {
        return (
            <OpnameSchedule />
        )
    } else if (view === 'opname-form') {
        return (
            <OpnameForm />
        )
    } else if (view === 'opname-terlaksana') {
        return (
            <OpnameTerlaksana />
        )
    } else if (view === 'opname-terlaksana-validasi') {
        return (
            <OpnameTerlaksanaValidasi />
        )
    } else if (view === 'opname') {
        return (
            <Opname />
        )
    } else if (view === 'opname-data') {
        return (
            <OpnameData />
        )
    } else if (view === 'opname-validasi') {
        return (
            <OpnameValidasi />
        )
    } else if (view === 'opname-detail') {
        return (
            <OpnameDetail />
        )
    }
}

export default WarehouseController
