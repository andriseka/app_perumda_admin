import React from 'react'

import Layouts from '../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom';
import { DeliveryDining, PlaylistAddCheckCircle, SwapHorizontalCircle } from '@mui/icons-material';

const Delivery = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
            <div>
                <h1>PENGIRIMAN</h1>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/delivery/data`} className={` sub-menu-item ${split[3] === 'data'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <DeliveryDining />
                                        </div>
                                        <span>Pengiriman</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/delivery/retur`} className={` sub-menu-item ${split[3] === 'retur'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <SwapHorizontalCircle />
                                        </div>
                                        <span>Retur Pengiriman</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/delivery/spoil`} className={` sub-menu-item ${split[3] === 'spoil'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <PlaylistAddCheckCircle />
                                        </div>
                                        <span>Spoil Pengiriman</span>
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

export default Delivery
