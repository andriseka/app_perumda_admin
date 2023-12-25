import React from 'react'
import Warehouse from '../Warehouse'
import { Button } from '@mui/material'

const Spoil = () => {
    const onDetail = (code) => {
        return window.location.href = `spoil/${code}`
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>DATA SPOIL PEMBELIAN</h3>
                            <span>List Data Spoil Pembelian</span>
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
                                                Kode Spoil
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Tanggal Spoil
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
                                        <td>TRP.SPOIL.001</td>
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
        </Warehouse>
    )
}

export default Spoil
