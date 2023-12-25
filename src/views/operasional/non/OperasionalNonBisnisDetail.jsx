import React from 'react'
import Layouts from '../../layouts/Layouts'
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from '@mui/icons-material';

const OperasionalNonBisnisDetail = () => {
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
                                <h3>OPERASIONAL NON BISNIS TR.OPNB.001</h3>
                                <span>Detail Operasional Non Bisnis</span>
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
                                        <th>Kode Operasional Non Bisnis</th>
                                        <td>: TR.OPNB.001</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Operasional Non Bisnis</th>
                                        <td>: 24 Desember 2023</td>
                                    </tr>
                                    <tr>
                                        <th>Kegiatan</th>
                                        <td>: REPARASI MOBIL</td>
                                    </tr>
                                    <tr>
                                        <th>Petugas</th>
                                        <td>: Hermawan</td>
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
                                                Kegiatan
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Unit
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Nominal
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Sub Total
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">01</td>
                                        <td>Ganti Oli Mobil</td>
                                        <td>1</td>
                                        <td>Rp. 150.000</td>
                                        <td>Rp. 150.000</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">02</td>
                                        <td>Perbaikan Mesin</td>
                                        <td>1</td>
                                        <td>Rp. 200.000</td>
                                        <td>Rp. 200.000</td>
                                    </tr>

                                    {/* total */}
                                    <tr>
                                        <th colSpan={4}>TOTAL OPERASIONAL</th>
                                        <th>RP. 350.000</th>
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

export default OperasionalNonBisnisDetail
