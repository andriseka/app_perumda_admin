import React from 'react'
import OperasionalBisnis from '../../views/operasional/bisnis/OperasionalBisnis'
import OperasionalNonBisnis from '../../views/operasional/non/OperasionalNonBisnis'
import OperasionalBisnisDetail from '../../views/operasional/bisnis/OperasionalBisnisDetail'
import OperasionalNonBisnisDetail from '../../views/operasional/non/OperasionalNonBisnisDetail'
import OperasionalNonBisnisForm from '../../views/operasional/non/form/OperasionalNonBisnisForm'
import OperasionalNonBisnisData from '../../views/operasional/non/data/OperasionalNonBisnisData'

function OperasionalController({ view }) {
    if (view === 'bisnis') {
        return (
            <OperasionalBisnis />
        )
    } else if(view === 'bisnis-detail') {
        return (
            <OperasionalBisnisDetail />
        )
    } else if (view === 'non-bisnis-form') {
        return (
            <OperasionalNonBisnisForm />
        )
    } else if (view === 'non-bisnis-data') {
        return (
            <OperasionalNonBisnisData />
        )
    }
}

export default OperasionalController
