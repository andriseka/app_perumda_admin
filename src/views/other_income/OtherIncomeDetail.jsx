import React from 'react'
import Layouts from '../layouts/Layouts'
import { useNavigate } from 'react-router-dom';
import { ArrowBackIosNew } from '@mui/icons-material';

const OtherIncomeDetail = () => {
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
                                <h3>PENDAPATAN LAINNYA TR.PL.001</h3>
                                <span>Detail Pendapatan Lainnya</span>
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
                                        <th>Kode Pendapatan Lainnya</th>
                                        <td>: TR.PL.001</td>
                                        <th>Nama Mitra</th>
                                        <td>: Ahmad Bejo</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Pendapatan Lainnya</th>
                                        <td>: 24 Desember 2023</td>
                                        <th>Alamat</th>
                                        <td>: Jl Pemuda No. 10</td>
                                    </tr>
                                    <tr>
                                        <th>Petugas</th>
                                        <td>: Ahmad Setiawan</td>
                                        <th>Nomor HP</th>
                                        <td>: +62897664567</td>
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
                                                Kuantitas
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Harga Satuan
                                            </span>
                                        </th>
                                        <th className="text-center table-border-end">
                                            <span className="form-control fw-bold">
                                                Sub Total
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">01</td>
                                        <td>Kopi Rojoku</td>
                                        <td>1 BOX</td>
                                        <td>Rp. 1.500</td>
                                        <td>Rp. 850.000</td>
                                    </tr>
                                    <tr>
                                        <td className="text-center">02</td>
                                        <td>Air Mineral Rojoku</td>
                                        <td>1 DUS</td>
                                        <td>Rp. 1.500</td>
                                        <td>Rp. 350.000</td>
                                    </tr>

                                    {/* total */}
                                    <tr>
                                        <th colSpan={4}>TOTAL PENDAPATAN</th>
                                        <th>RP. 1.200.000</th>
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

export default OtherIncomeDetail
