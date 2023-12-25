import React, { useEffect, useState } from 'react'

import Warehouse from '../../Warehouse'
import { useDispatch } from 'react-redux'
import { getPurchaseTotalBySistemPembayaran } from '../../../../models/purchase/purchase_total_m';

import { NumericFormat } from 'react-number-format';
import { Button } from '@mui/material';
import { BackupTable } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'react-moment';

import Paginate from '../../../pagination/Paginate'

const PurchaseTempo = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const navigate = useNavigate();

    const [tempo, setTempo] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataTempo = async(page) => {
        try {
            const data = {
                status: 'tempo',
                page: page
            }
            const response = await dispatch(getPurchaseTotalBySistemPembayaran(data)).unwrap().catch((err) => {});
            setTempo(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataTempo(1);
    }, []);

    const onClickPurchaseData = () => {
        return navigate(`/${username}/warehouse/purchase/data`)
    }

    const handlePurchaseTempoDetail = (code) => {
        return window.location.href = `/${username}/warehouse/purchase/tempo/data/${code}`
    }

    const handlePagination = (_, page) => {
        return getDataTempo(page);
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>DATA PEMBELIAN TEMPO</h3>
                                <span>List Data Pembelian Tempo</span>
                            </div>
                            <div className="d-flex">
                                <div onClick={onClickPurchaseData} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-primary" style={{padding: '.4rem .4rem'}}>
                                        <BackupTable sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Data</span>
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
                            <table className="table align-middle">
                                <thead>
                                    <tr>
                                        <th style={{width: '5%'}} className="table-border-start">
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Transaksi</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Tanggal Transaksi</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Supplier</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Total</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Terbayar</span>
                                        </th>
                                        <th className="text-center">
                                            <span className="form-control">Status</span>
                                        </th>
                                        <th style={{widt: '15%'}} className="table-border-end text-center">
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tempo.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{data.no}</td>
                                                    <td>{data.code}</td>
                                                    <td>
                                                        <Moment format="dddd, DD MMMM YYYY">{data.tgl_transaksi}</Moment>
                                                    </td>
                                                    <td>{data.supplier}</td>
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
                                                    <td className="text-center">
                                                        { data.status_pembayaran === 'belum' ? 
                                                            <span className="badge bg-orange">Belum</span> : 
                                                            <span className="badge bg-green">Lunas</span>
                                                        }
                                                    </td>
                                                    <td className="text-center">
                                                        <Button onClick={() => handlePurchaseTempoDetail(data.code)} variant="contained" color="success" size="small">
                                                            Detail
                                                        </Button>
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
                            {
                                pagination.pagination ? 
                                <Paginate count={pagination.total} page={pagination.current_page} onChange={handlePagination} /> : ''
                            }
                            <div>
                                <span>Total : { pagination.current_page ? pagination.current_page : '' } Tempo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default PurchaseTempo
