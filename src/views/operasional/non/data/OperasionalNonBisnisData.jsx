import React from 'react'
import OperasionalNonBisnis from '../OperasionalNonBisnis'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'

const OperasionalNonBisnisData = () => {
    const onDetail = (code) => {
        return window.location.href = `non-bisnis/${code}`
    }
    return (
        <OperasionalNonBisnis>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>DATA OPERASIONAL NON BISNIS</h3>
                            <span>List Data Operasional Non Bisnis</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="row align-items-end">
                            <div className="col-md-2 mb-3">
                                <label className="form-label">Tanggal Awal</label>
                                <DatePicker label="Tanggal Awal" slotProps={{ textField: { size: 'small', fullWidth: true } }} />
                            </div>
                            <div className="col-md-2 mb-3">
                                <label className="form-label">Tanggal Akhir</label>
                                <DatePicker label="Tanggal Akhir" slotProps={{ textField: { size: 'small', fullWidth: true } }} />
                            </div>

                            <div className="col-md-7 mb-3">
                                <label className="form-label">Nama Kegiatan</label>
                                <TextField 
                                    fullWidth
                                    size="small"
                                    placeholder="Cari Nama Kegiatan"
                                />
                            </div>

                            <div className="col-md-1 mb-3">
                                <Button fullWidth variant="contained" >
                                    Filter
                                </Button>
                            </div>
                        </div>
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
                                                Kode Operasional
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Tanggal Operasional
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Kegiatan
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
                                        <td>TR.OPNB.001</td>
                                        <td>24 Desember 2023</td>
                                        <td>Reparasi Mobil</td>
                                        <td>Rp. 1.500.000</td>
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
        </OperasionalNonBisnis>
    )
}

export default OperasionalNonBisnisData
