import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Layouts from '../layouts/Layouts';
import { MonetizationOn, PlaylistAddCheckCircle, SwapHorizontalCircle } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Sales = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
             <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Toaster position="top-center" />
                <div>
                    <h1>PENJUALAN</h1>
                </div>

                <div className="mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="sub-menu">
                                <ul>
                                    <li>
                                        <Link to={`/${username}/sales`} className={` sub-menu-item ${split[2] === 'sales'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <MonetizationOn />
                                            </div>
                                            <span>Penjualan</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/sales/retur`} className={` sub-menu-item ${split[3] === 'retur'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <SwapHorizontalCircle />
                                            </div>
                                            <span>Retur Penjualan</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/sales/spoil`} className={` sub-menu-item ${split[3] === 'spoil'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <PlaylistAddCheckCircle />
                                            </div>
                                            <span>Spoil Penjualan</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                { children }
            </LocalizationProvider>
        </Layouts>
    )
}

export default Sales
