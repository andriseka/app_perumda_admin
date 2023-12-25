import React from 'react'
import Delivery from '../Delivery'
import { Button } from '@mui/material'

const DeliveryData = () => {
    const onDetail = (code) => {
        return window.location.href = `data/${code}`
    }

    return (
        <Delivery>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>DATA PENGIRIMAN</h3>
                            <span>List Data Pengiriman</span>
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
                                                Kode Pengiriman
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Tanggal Pengiriman
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Petugas
                                            </span>
                                        </th>
                                        <th className="text-center">
                                            <span className="form-control fw-bold">
                                                Status
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
                                        <td>TR..PR.001</td>
                                        <td>24 Desember 2023</td>
                                        <td>Ahmad Setiawan</td>
                                        <td className="text-center">
                                            <span className="px-2 py-1 rounded bg-danger text-white">
                                                Perjalanan
                                            </span>
                                        </td>
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
        </Delivery>
    )
}

export default DeliveryData
