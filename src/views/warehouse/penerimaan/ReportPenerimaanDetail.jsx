import React, { useEffect, useState } from 'react'
import Warehouse from '../Warehouse'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getDetailReportPenerimaan } from '../../../models/penerimaan/report_penerimaan_m';
import { ReplyAll } from '@mui/icons-material';
import Moment from 'react-moment';

import { NumericFormat } from 'react-number-format';

const ReportPenerimaanDetail = () => {
    const { username, code } = useParams();
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handlePenerimaanData = () => {
        return navigate(-1)
    }

    const [report, setReport] = useState([]);
    const [list, setList] = useState([]);

    const getDataDetail = async() => {
        try {
            const response = await dispatch(getDetailReportPenerimaan(code)).unwrap().catch((err) => {});
            setReport(response.report_penerimaan);
            setList(response.penerimaan_list)
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>{ report.code_purchase_total }</h3>
                                <span>Detail Penerimaan Pembelian</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={handlePenerimaanData} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem', borderRadius: '100%'}}>
                                        <ReplyAll sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Kembali</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive mb-3">
                            <table className="table table-borderless">
                                <tbody>
                                    <tr>
                                        <th>Kode Pembelian</th>
                                        <td>: {report.code_purchase_total}</td>

                                        <th>Supplier</th>
                                        <td>: {report.supplier}</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Penerimaan</th>
                                        <td>
                                            : <Moment format="dddd, DD MMMM YYYY">{report.tgl_penerimaan}</Moment>, {report.waktu} WIB
                                        </td>

                                        <th>Biaya Lainnya</th>
                                        <td>
                                            :   <NumericFormat 
                                                    value={ report.biaya_operasional_product } 
                                                    allowLeadingZeros 
                                                    thousandSeparator="," 
                                                    valueIsNumericString
                                                    prefix="Rp. "
                                                    displayType="text"
                                                    renderText={(value) => <span>{value}</span>}
                                                />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Petugas</th>
                                        <td>: {report.petugas}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-border-start text-center" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Produk</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Nama Produk</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kategori</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Jumlah Pembelian</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Jumlah Diterima</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Status</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">{index + 1}</td>
                                                    <td>{data.code_product}</td>
                                                    <td>{data.product}</td>
                                                    <td>{data.category}</td>
                                                    <td>{data.qty}</td>
                                                    <td>{data.accept_qty}</td>
                                                    <td>
                                                        {
                                                            data.status === 'sesuai' ? 'Sesuai' : 'Tidak Sesuai'
                                                        }
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    <tr>
                                        <th>
                                            Catatan
                                        </th>
                                        <td colSpan={6}>
                                            : { report.desc }
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

export default ReportPenerimaanDetail
