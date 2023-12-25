import React from 'react'
import Layouts from '../../layouts/Layouts'
import { ArrowBackIosNew } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';

const OperasionalBisnisDetail = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        return navigate(-1);
    }

    return (
        <Layouts>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>OPERASIONAL BISNIS TR.RTR.001</h3>
                                <span>Detail Operasional Bisnis</span>
                            </div>
                            <div>
                                <span onClick={handleBack} className="px-1 py-2 rounded-circle" style={{backgroundColor: 'orange', cursor: 'pointer'}}>
                                    <ArrowBackIosNew  sx={{color: '#ffffff'}} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table table-borderless align-middle" style={{minWidth: '100%'}}>
                                <tbody>
                                    <tr>
                                        <th>Kode Operasional Bisnis</th>
                                        <td>: TR.OPB.001</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Operasional Bisnis</th>
                                        <td>: 24 Desember 2023</td>
                                    </tr>
                                    <tr>
                                        <th>Kegiatan</th>
                                        <td>: GAJI KARYAWAN</td>
                                    </tr>
                                </tbody>
                            </table>
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
                                                Nama Karyawan
                                            </span>
                                        </th>
                                        <th style={{width: '40%'}}>
                                            <span className="form-control fw-bold">
                                                Posisi
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Jabatan
                                            </span>
                                        </th>
                                        <th className="text-center table-border-end">
                                            <span className="form-control fw-bold">
                                                Nominal
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">01</td>
                                        <td>Endang Suharti</td>
                                        <td>Perdagangan</td>
                                        <td>Staf</td>
                                        <td>Rp. 2.500.000</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">02</td>
                                        <td>Ahmad Setiawan</td>
                                        <td>Perdagangan</td>
                                        <td>Kepala Staf Bidang</td>
                                        <td>Rp. 3.500.000</td>
                                    </tr>

                                    {/* total */}
                                    <tr>
                                        <th colSpan={4}>TOTAL OPERASIONAL</th>
                                        <th>RP. 5.500.000</th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-3">
                            <span className="fw-bold">CATATAN</span> :
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusamus corrupti nesciunt voluptas iure neque modi officiis vitae inventore voluptate obcaecati, consectetur sunt nostrum repellendus beatae corporis optio repellat perferendis.
                        </div>
                    </div>
                </div>
            </div>
        </Layouts>
    )
}

export default OperasionalBisnisDetail
