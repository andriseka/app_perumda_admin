import React from 'react'
import Layouts from '../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom';
import { PlaylistAddCheckCircle, PlaylistAddCircle, ShoppingBag, Storefront } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

const Mitra = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
            <Toaster position="top-center" />
            <div>
                <h1>MITRA</h1>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/mitra/supplier/form`} className={` sub-menu-item ${split[3] === 'supplier'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Supplier</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/mitra/marketing/form`} className={` sub-menu-item ${split[3] === 'marketing'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <ShoppingBag />
                                        </div>
                                        <span>Marketing</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/mitra/toko/data`} className={` sub-menu-item ${split[3] === 'toko'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <Storefront />
                                        </div>
                                        <span>Toko</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            { children }
        </Layouts>
    )
}

export default Mitra
