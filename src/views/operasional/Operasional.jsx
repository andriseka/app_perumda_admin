import React from 'react'
import Layouts from '../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BusinessCenter, WorkOff } from '@mui/icons-material';

const Operasional = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
            <div>
                <h1>OPERASIONAL</h1>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/operasional/bisnis`} className={` sub-menu-item ${split[3] === 'bisnis'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <BusinessCenter />
                                        </div>
                                        <span>Bisnis</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/operasional/non-bisnis/data`} className={` sub-menu-item ${split[3] === 'non-bisnis'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <WorkOff />
                                        </div>
                                        <span>Non Bisnis</span>
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

export default Operasional
