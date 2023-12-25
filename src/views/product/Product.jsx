import React from 'react'
import Layouts from '../layouts/Layouts'
import { PlaylistAddCheckCircle, PlaylistAddCircle, Settings } from '@mui/icons-material'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Product = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Toaster position="top-center" />
                <div>
                    <h1>PRODUK</h1>
                </div>

                <div className="mt-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="sub-menu">
                                <ul>
                                    <li>
                                        <Link to={`/${username}/product/form`} className={` sub-menu-item ${split[3] === 'form'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <PlaylistAddCircle />
                                            </div>
                                            <span>Buat Produk</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/${username}/product/data`} className={` sub-menu-item ${split[3] === 'data'? 'active' : ''} `} >
                                            <div className="me-2">
                                                <PlaylistAddCheckCircle />
                                            </div>
                                            <span>Data Produk</span>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to={`/${username}/product/setting`} className={` sub-menu-item ${split[3] === 'setting'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <Settings />
                                            </div>
                                            <span>Setting Harga</span>
                                        </Link>
                                    </li> */}
                                    <li>
                                        <Link to={`/${username}/product/master/category/data`} className={` sub-menu-item ${split[3] === 'master'? 'active' : ''} `}>
                                            <div className="me-2">
                                                <PlaylistAddCircle />
                                            </div>
                                            <span>Master Produk</span>
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

export default Product
