import React from 'react'
import FInancialBisnis from '../../views/financial/bisnis/FInancialBisnis'
import FinancialPenunjang from '../../views/financial/penunjang/FinancialPenunjang'
import FinancialOperasional from '../../views/financial/operasional/FinancialOperasional'

function FinancialController({ view }) {
    if (view === 'bisnis') {
        return (
            <FInancialBisnis />
        )
    } else if (view === 'penunjang') {
        return (
            <FinancialPenunjang />
        )
    } else if (view === 'operasional') {
        return (
            <FinancialOperasional />
        )
    }
}

export default FinancialController
