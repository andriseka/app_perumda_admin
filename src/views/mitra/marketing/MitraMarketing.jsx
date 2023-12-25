import React from 'react'
import Mitra from '../Mitra'
import { Link, useLocation, useParams } from 'react-router-dom';
import { PlaylistAddCheckCircle, PlaylistAddCircle } from '@mui/icons-material';

const MitraMarketing = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Mitra>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/mitra/marketing/form`} className={` sub-menu-item ${split[4] === 'form'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Daftarkan Marketing</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/mitra/marketing/data`} className={` sub-menu-item ${split[4] === 'data'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <PlaylistAddCheckCircle />
                                        </div>
                                        <span>Data Marketing</span>
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

export default MitraMarketing
