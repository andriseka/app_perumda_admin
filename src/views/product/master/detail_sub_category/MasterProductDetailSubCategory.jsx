import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import ProductMaster from '../ProductMaster';
import { PlaylistAddCheckCircle, PlaylistAddCircle } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

const MasterProductDetailSubCategory = ({ children }) => {
    const { username } = useParams();

    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <ProductMaster>
            <Toaster position="top-center" />
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/product/master/detail-sub-category/form`} className={` sub-menu-item ${split[5] === 'form'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Form</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/product/master/detail-sub-category/data`} className={` sub-menu-item ${split[5] === 'data'? 'active' : ''} `} >
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

export default MasterProductDetailSubCategory
