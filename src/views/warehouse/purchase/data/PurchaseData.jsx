import React, { useEffect, useState } from 'react'
import Warehouse from '../../Warehouse'
import { Alarm, BackupTable } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPurchaseTotal } from '../../../../models/purchase/purchase_total_m'

import { NumericFormat } from 'react-number-format';
import { Button } from '@mui/material'
import toast from 'react-hot-toast'
import Moment from 'react-moment'

import Paginate from '../../../pagination/Paginate'

const PurchaseData = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username } = useParams();

    const [purchase, setPurchase] = useState([]);
    const [pagination, setPagination] = useState([]);

    const onClickForm = () => {
        return navigate(`/${username}/warehouse/purchase/form`)
    }

    const onClickPurchaseTempo = () => {
        return navigate(`/${username}/warehouse/purchase/tempo/data`)
    }

    const getDataPurchase = async(page) => {
        try {
            const response = await dispatch(getPurchaseTotal(page)).unwrap().catch((err) => {});
            setPurchase(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataPurchase(1);
    }, []);

    const handlePagination = (_, page) => { 
        return getDataPurchase(page);
    }

    const handleDetailPurchase =(code) => {
        return navigate(`${code}`)
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>DATA PEMBELIAN</h3>
                                <span>List Data Pembelian</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={onClickForm} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem'}}>
                                        <BackupTable sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Pembelian</span>
                                </div>

                                <div onClick={onClickPurchaseTempo} className="text-center" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-info" style={{padding: '.4rem .4rem'}}>
                                        <Alarm sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Tempo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-border-start" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Tanggal Transaksi</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Supplier</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Sistem</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Status</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Nominal</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Terbayar</span>
                                        </th>
                                        <th style={{width: '15%'}} className="text-center table-border-end">
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        purchase.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td>{data.no}</td>
                                                    <td>{data.code}</td>
                                                    <td>
                                                        <Moment format="dddd, DD MMMM YYYY">{data.tgl_transaksi}</Moment>
                                                    </td>
                                                    <td>{data.supplier}</td>
                                                    <td>
                                                        {
                                                            data.sistem_pembayaran === 'tempo' ? 'Tempo' : 'Tunai'
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            data.status_pembayaran === 'belum' ? 'Belum Lunas' : 'Lunas'
                                                        }
                                                    </td>
                                                    <td>
                                                        <NumericFormat 
                                                            value={ data.total_pembayaran } 
                                                            allowLeadingZeros 
                                                            thousandSeparator="," 
                                                            valueIsNumericString
                                                            prefix="Rp. "
                                                            displayType="text"
                                                            renderText={(value) => <span>{value}</span>}
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumericFormat 
                                                            value={ data.nominal_bayar } 
                                                            allowLeadingZeros 
                                                            thousandSeparator="," 
                                                            valueIsNumericString
                                                            prefix="Rp. "
                                                            displayType="text"
                                                            renderText={(value) => <span>{value}</span>}
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="d-flex justify-content-center">
                                                            <Button onClick={() => handleDetailPurchase(data.code)} variant="contained" color="success" size="small">
                                                                Detail
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
                        <div className="d-flex justify-content-between">
                            <div>
                                <span>Halaman : { pagination.current_page ? pagination.current_page : '' }</span>
                            </div>
                            <div>
                                {
                                    pagination.pagination ? 
                                    <Paginate count={pagination.total} page={pagination.current_page} onChange={handlePagination} /> : ''
                                }
                            </div>
                            <div>
                                <span>Total : { pagination.total ? pagination.total : '' } Pembelian</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default PurchaseData
