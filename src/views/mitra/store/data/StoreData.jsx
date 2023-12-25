import React, { useEffect, useState } from 'react'

import Store from '../Store'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import Paginate from '../../../pagination/Paginate'
import { getStore } from '../../../../models/store/store_m';
import { Button } from '@mui/material';

const StoreData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [store, setStore] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataStore = async(page) => {
        try {
            const response = await dispatch(getStore(page)).unwrap().catch((err) => {});
            setStore(response.data);
            setPagination(response.pagination)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataStore(1);
    }, []);

    const handlePagination = (_, page) => {
        return getDataStore(page)
    }

    return (
        <Store>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th className="table-border-start text-center" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Toko</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Nama Toko</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kategori</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Referal</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Telephone</span>
                                        </th>
                                        <th className="table-border-end text-center" style={{width: '15%'}}>
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        store.map((data) => (
                                            <tr key={data.no}>
                                                <td className="text-center">{data.no}</td>
                                                <td>{data.code}</td>
                                                <td>{data.name}</td>
                                                <td>{data.category}</td>
                                                <td>{data.marketing}</td>
                                                <td>{data.phone}</td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <Button size="small" variant="contained" color="success" sx={{mr: 1}}>
                                                            Detail
                                                        </Button>
                                                        <Button size="small" variant="contained" color="error">
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span>Halaman : { pagination.current_page ? pagination.current_page : '' }</span>
                            </div>
                            {
                                pagination.pagination ? 
                                <Paginate count={pagination.total} page={pagination.current_page} onChange={handlePagination} />  : ''
                            }
                            <div>
                                <span>Total : { pagination.total ? pagination.total : '' } Toko</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Store>
    )
}

export default StoreData
