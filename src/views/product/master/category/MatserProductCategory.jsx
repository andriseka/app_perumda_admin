import React from 'react'
import Layouts from '../../../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom'
import { PlaylistAddCheckCircle, PlaylistAddCircle, Settings } from '@mui/icons-material';
import ProductMaster from '../ProductMaster';

const MatserProductCategory = ({ children }) => {
    const { username } = useParams();

    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');


    return (
        <ProductMaster>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/product/master/category/form`} className={` sub-menu-item ${split[5] === 'form'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Form</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/product/master/category/data`} className={` sub-menu-item ${split[5] === 'data'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <PlaylistAddCheckCircle />
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
        </ProductMaster>
    )
}

export default MatserProductCategory
