import React from 'react'
import Layouts from '../../layouts/Layouts'
import { Link, useLocation, useParams } from 'react-router-dom'
import { BrandingWatermark, PlaylistAddCheckCircle, PlaylistAddCircle, Settings } from '@mui/icons-material'

const ProductMaster = ({ children }) => {
    const { username } = useParams();

    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');


    const goback = () => {
        return window.location.href = `/${username}/product/data`
    }

    return (
        <Layouts>
            <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h1>MASTER PRODUK</h1>
                    </div>
                    <div>
                        <a className="text-primary" style={{cursor: 'pointer'}} onClick={goback}>Produk</a>
                        <span> / Master Produk</span>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/product/master/category/data`} className={` sub-menu-item ${split[4] === 'category'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Kategori</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/product/master/sub-category/data`} className={` sub-menu-item ${split[4] === 'sub-category'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <PlaylistAddCheckCircle />
                                        </div>
                                        <span>Sub Kategori</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/product/master/detail-sub-category/data`} className={` sub-menu-item ${split[4] === 'detail-sub-category'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <Settings />
                                        </div>
                                        <span>Detail Sub Kategori</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/product/master/merk/data`} className={` sub-menu-item ${split[4] === 'merk'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <BrandingWatermark />
                                        </div>
                                        <span>Merk</span>
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

export default ProductMaster
