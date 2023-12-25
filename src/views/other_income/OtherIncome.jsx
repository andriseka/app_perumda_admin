import React from 'react'
import Layouts from '../layouts/Layouts'
import { Button } from '@mui/material'

const OtherIncome = () => {
    const onDetail = (code) => {
        return window.location.href = `other-income/${code}`
    }

    return (
        <Layouts>
            <div>
                <h1>PENDAPATAN LAINNYA</h1>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>Data Pendapatan Lainnya</h3>
                            <span>List Data Pendapatan Lainnya</span>
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
                                                Kode Pendapatan Lainnya
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Tanggal Pendapatan
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
                                        <td>TR.PL.001</td>
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
        </Layouts>
    )
}

export default OtherIncome
