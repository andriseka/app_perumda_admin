import React from 'react'
import Layouts from '../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Inventory2, LocalMall, PlaylistAddCheckCircle, PlaylistRemoveRounded, ShoppingBag, ShoppingBagRounded } from '@mui/icons-material'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Toaster } from 'react-hot-toast';

const Warehouse = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Toaster position="top-center" />
                <div>
                    <h1>PERGUDANGAN</h1>
                </div>

                <div className="mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="sub-menu ">
                                <ul>
                                    <li>
                                        <Link to={`/${username}/warehouse/purchase/data`} className={` sub-menu-item ${split[3] === 'purchase'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <LocalMall />
                                            </div>
                                            <span>Pembelian</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/warehouse/penerimaan/data`} className={` sub-menu-item ${split[3] === 'penerimaan'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <LocalMall />
                                            </div>
                                            <span>Penerimaan</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/warehouse/stock`} className={` sub-menu-item ${split[3] === 'stock'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <Inventory2 />
                                            </div>
                                            <span>Stok</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/warehouse/opname`} className={` sub-menu-item ${split[3] === 'opname'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <PlaylistAddCheckCircle />
                                            </div>
                                            <span>Opname</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/warehouse/spoil`} className={` sub-menu-item ${split[3] === 'spoil'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <PlaylistRemoveRounded />
                                            </div>
                                            <span>Spoil</span>
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

export default Warehouse
