import React from 'react'
import Sales from '../Sales'
import { Button } from '@mui/material'
import { Alarm, BackupTable } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'

const SalesData = () => {
    const navigate = useNavigate();
    const { username } = useParams();

    const onDetail = (code) => {
        return window.location.href = `data/${code}`
    }

    const clickKasir = () => {
        return navigate(`/${username}/sales/form`)
    }

    return (
        <Sales>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>DATA PENJUALAN</h3>
                                <span>List Data Penjualan</span>
                            </div>
                            <div className="d-flex">
                                <div onClick={clickKasir} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem'}}>
                                        <BackupTable sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Kasir Marketing</span>
                                </div>

                                <div className="text-center" style={{cursor: 'pointer'}}>
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
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle">
                                <thead>
                                    <tr>
                                        <th className="text-center table-border-start" style={{width: '5%'}}>
                                            <span className="form-control fw-bold">
                                                No
                                            </span>
                                        </th>
                                        <th style={{width: '15%'}}>
                                            <span className="form-control fw-bold">
                                                Kode Transaksi
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Tanggal Transaksi
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Petugas
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Nominal
                                            </span>
                                        </th>
                                        <th style={{width: '15%'}} className="text-center table-border-end">
                                            <span className="form-control fw-bold">
                                                Action
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">01</td>
                                        <td>TR.001</td>
                                        <td>24 Desember 2023</td>
                                        <td>Ahmad Setiawan</td>
                                        <td>Rp. 1.200.000</td>
                                        <td>
                                            <div className="d-flex justify-content-center">
                                                <Button onClick={() => onDetail('TRP.001')} size="small" variant="contained" color="success" sx={{mr: 2}}>
                                                    Detail
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Sales>
    )
}

export default SalesData
