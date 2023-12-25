import React from 'react'
import OtherIncome from '../../views/other_income/OtherIncome'
import OtherIncomeDetail from '../../views/other_income/OtherIncomeDetail'

function OtherIncomeController({ view }) {
    if (view === 'other-income') {
        return (
            <OtherIncome />
        )
    } else if (view === 'other-income-detail') {
        return (
            <OtherIncomeDetail />
        )
    }
}

export default OtherIncomeController
