import React from 'react'
import Operasional from '../Operasional'
import { Button } from '@mui/material'
import { Link, useLocation, useParams } from 'react-router-dom';
import { BusinessCenter, WorkOff } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const OperasionalNonBisnis = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Operasional>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div className="mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="sub-menu">
                                <ul>
                                    <li>
                                        <Link to={`/${username}/operasional/non-bisnis/form`} className={` sub-menu-item ${split[4] === 'form'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <BusinessCenter />
                                            </div>
                                            <span>Form</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/operasional/non-bisnis/data`} className={` sub-menu-item ${split[4] === 'data'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <WorkOff />
                                            </div>
                                            <span>Data</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                { children }
            </LocalizationProvider>
        </Operasional>
    )
}

export default OperasionalNonBisnis
