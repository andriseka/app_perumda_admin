import React from 'react'
import Warehouse from '../Warehouse'
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from '@mui/icons-material';

const OpnameDetail = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        return navigate(-1);
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>OPNAME OPNM.001</h3>
                                <span>Detail Opname</span>
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
                                        <th>Kode Opname</th>
                                        <td>: OPNM.001</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Opname</th>
                                        <td>: 24 Desember 2023</td>
                                    </tr>
                                    <tr>
                                        <th>Petugas</th>
                                        <td>: Ahmad Setiawan</td>
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
                                                Nama Produk
                                            </span>
                                        </th>
                                        <th style={{width: '40%'}}>
                                            <span className="form-control fw-bold">
                                                Hasil Opname
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Stok
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Status
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">01</td>
                                        <td>Kopi Rojoku</td>
                                        <td>10 BOX</td>
                                        <td>10 BOX</td>
                                        <th className="text-green">Sesuai</th>
                                    </tr>
                                    <tr>
                                        <td className="text-center">02</td>
                                        <td>Air Mineral Rojoku</td>
                                        <td>20 DUS</td>
                                        <td>20 DUS</td>
                                        <th className="text-green">Sesuai</th>
                                    </tr>
                                </tbody>
                            </table>

                            <div className="mt-3">
                                <span className="fw-bold">CATATAN</span> :
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam accusamus corrupti nesciunt voluptas iure neque modi officiis vitae inventore voluptate obcaecati, consectetur sunt nostrum repellendus beatae corporis optio repellat perferendis.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default OpnameDetail
