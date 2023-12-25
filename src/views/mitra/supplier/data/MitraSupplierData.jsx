import React, { useEffect, useState } from 'react'
import MitraSupplier from '../MitraSupplier'
import { useDispatch } from 'react-redux'
import { getSupplier } from '../../../../models/supplier/supplier_m';
import { Button, MenuItem, Select, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Paginate from '../../../pagination/Paginate'

const MitraSupplierData = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [supplier, setSupplier] = useState([]);
    const [pagination, setPagination] = useState([])

    const getDataSupplier = async(page) => {
        try {
            const response = await dispatch(getSupplier(page)).unwrap().catch((err) => {});
            setSupplier(response.data);
            setPagination(response.pagination)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataSupplier(1);
    }, [])

    const onDetail = (code) => {
        return navigate(`${code}`)
    }

    const handlePagination = (_, page) => {
        return getDataSupplier(page)
    }

    return (
        <MitraSupplier>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3 text-center">
                            <h3>
                                DATA SUPPLIER PERUMDA ANEKA USAHA <br />
                                KABUPATEN JEPARA
                            </h3>
                        </div>
                        <div className="row align-items-end">
                            <div className="col-md-2 mb-3">
                                <label className="form-label">Status Mitra</label>
                                <Select
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem>Perusahaan</MenuItem>
                                    <MenuItem>Perorangan</MenuItem>
                                </Select>
                            </div>
                            <div className="col-md-2 mb-3">
                                <label htmlFor="" className="form-label">Kategori Usaha</label>
                                <Select
                                    size="small"
                                    fullWidth
                                >
                                    <MenuItem>Kopi</MenuItem>
                                    <MenuItem>ATK</MenuItem>
                                    <MenuItem>Air</MenuItem>
                                </Select>
                            </div>

                            <div className="col-md-7 mb-3">
                                <label className="form-label">Cari Nama Supplier</label>
                                <TextField 
                                    size="small"
                                    fullWidth
                                    placeholder="Cari Nama Supplier"
                                />
                            </div>

                            <div className="col-md-1 mb-3">
                                <Button fullWidth variant="contained">
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-border-start" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Supplier</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Nama Supplier</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Status Badan</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kategori Usaha</span>
                                        </th>
                                        <th  className="table-border-end text-center">
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        supplier.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td>{data.no}</td>
                                                    <td>{data.code}</td>
                                                    <td>{data.name}</td>
                                                    <td>
                                                        {
                                                            data.status === 'company' ? 'Perusahaan' : 'Perorangan'
                                                        }
                                                    </td>
                                                    <td>
                                                        { data.category }
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Button onClick={() => onDetail(data.code)} size="small" variant="contained" color="success" sx={{mr: 1}}>
                                                                Detail
                                                            </Button>
                                                            <Button size="small" variant="contained" color="error">
                                                                Delete
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="d-flex justify-content-between align-center">
                            <div>
                                <span>Halaman : { pagination.current_page }</span>
                            </div>

                            {
                                pagination.pagination ? 
                                <Paginate count={pagination.total} page={pagination.current_page} onChange={handlePagination} /> : ''
                            }

                            <div>
                                <span>Total : { pagination.total } Supplier</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MitraSupplier>
    )
}

export default MitraSupplierData
