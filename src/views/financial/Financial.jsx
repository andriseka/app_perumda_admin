import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import Layouts from '../layouts/Layouts';
import { AllInbox, BusinessCenter, WorkOff } from '@mui/icons-material';

const Financial = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
            <div>
                <h1>FINANCIAL</h1>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/financial/bisnis`} className={` sub-menu-item ${split[3] === 'bisnis'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <BusinessCenter />
                                        </div>
                                        <span>Financial Bisnis</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/financial/penunjang`} className={` sub-menu-item ${split[3] === 'penunjang'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <WorkOff />
                                        </div>
                                        <span>Financial Penunjang Bisnis</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/financial/operasional`} className={` sub-menu-item ${split[3] === 'operasional'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <AllInbox />
                                        </div>
                                        <span>Financial Operasional</span>
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

export default Financial
