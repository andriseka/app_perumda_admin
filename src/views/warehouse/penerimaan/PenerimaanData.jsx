import React, { useEffect, useState } from 'react'

import Warehouse from '../Warehouse'
import { useDispatch } from 'react-redux'
import { getPurchaseTotal, getPurchaseTotalByStatusPenerimaan } from '../../../models/purchase/purchase_total_m';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

import { NumericFormat } from 'react-number-format';
import Moment from 'react-moment';
import { Button } from '@mui/material';
import { BackupTable, ThumbUpAlt } from '@mui/icons-material';

const PenerimaanData = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useParams();

    const handlePenerimaanReport = () => {
        return navigate(`/${username}/warehouse/penerimaan/report`)
    }

    const [purchase, setPurchase] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataPurchase = async(page) => {
        const data = {
            status_penerimaan: 'belum',
            page: page
        }
        try {
            const response = await dispatch(getPurchaseTotalByStatusPenerimaan(data)).unwrap().catch((err) => {});
            setPurchase(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataPurchase(1);
    }, []);

    const handlePagination = (page) => { 
        if (page === 0) {
            toast('Anda berada di halaman pertama')
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada di halaman terakhir')
        } else {
            return getDataPurchase(page);
        }
    }

    const handleDetail =(code) => {
        return navigate(`${code}`)
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>JADWAL PENERIMAAN PEMBELIAN</h3>
                                <span>List Jadwal Penerimaan Pembelian</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={handlePenerimaanReport} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-primary" style={{padding: '.4rem .4rem'}}>
                                        <ThumbUpAlt sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Diterima</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-border-start" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Pembelian</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Tanggal Pengiriman</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Supplier</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Total Pembayaran</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Status Penerimaan</span>
                                        </th>
                                        <th className="text-center table-border-end" style={{width: '15%'}}>
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        purchase.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{data.no}</td>
                                                    <td>
                                                        { data.code }
                                                    </td>
                                                    <td>
                                                        <Moment format="dddd, DD MMMM YYYY">{data.jadwal_pengiriman}</Moment>
                                                    </td>
                                                    <td>
                                                        { data.supplier }
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
                                                        {
                                                            data.status_penerimaan === 'diterima' ? 
                                                            <span className="badge bg-green">Diterima</span> : 
                                                            <span className="badge bg-orange">Belum Diterima</span>
                                                        }
                                                    </td>
                                                    <td className="text-center">
                                                        <Button disabled={ data.status_penerimaan === 'diterima' ? true : false } onClick={() => handleDetail(data.code)} variant="contained" color="success" size="small">
                                                            validasi
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default PenerimaanData
