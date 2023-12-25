import React from 'react'
import Mitra from '../Mitra'
import { Link, useLocation, useParams } from 'react-router-dom';
import { PlaylistAddCheckCircle, PlaylistAddCircle } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

const Store = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Mitra>
            <Toaster position="top-center" />
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/mitra/toko/form`} className={` sub-menu-item ${split[4] === 'form'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Daftarkan Toko</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/mitra/toko/data`} className={` sub-menu-item ${split[4] === 'data'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <PlaylistAddCheckCircle />
                                        </div>
                                        <span>Data Toko</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            { children }
        </Mitra>
    )
}

export default Store
