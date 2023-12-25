import React, { useState } from 'react'
import EmployeeForm from '../../views/employee/form/EmployeeForm'
import EmployeeData from '../../views/employee/data/EmployeeData'
import { Camera, CameraResultType } from '@capacitor/camera';
import EmployeeDataDetail from '../../views/employee/data/EmployeeDataDetail';

function EmployeeController({ view }) {
    if (view === 'form') {
        return (
            <EmployeeForm />
        )
    } else if (view === 'data') {
        return (
            <EmployeeData />
        )
    } else if (view === 'data-detail') {
        return (
            <EmployeeDataDetail />
        )
    }
}

export default EmployeeController
