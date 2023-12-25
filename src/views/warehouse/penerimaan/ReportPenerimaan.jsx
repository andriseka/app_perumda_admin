import React, { useEffect, useState } from 'react'

import Warehouse from '../Warehouse'
import { ReplyAll } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getReportPenerimaan } from '../../../models/penerimaan/report_penerimaan_m'
import toast from 'react-hot-toast'
import { Button } from '@mui/material'

import { NumericFormat } from 'react-number-format';
import Moment from 'react-moment'

const ReportPenerimaan = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username } = useParams();

    const handlePenerimaanData = () => {
        return window.location.href = `/${username}/warehouse/penerimaan/data`
    }

    const handleDetail = (code) => {
        return navigate(`${code}`)
    }

    const [report, setReport] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getData = async(page) => {
        try {
            const response = await dispatch(getReportPenerimaan(page)).unwrap().catch((err) => {});
            setReport(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getData(1)
    }, []);

    const handlePagination = (page) => {
        if (page === 0) {
            toast('Anda berada di halaman pertama')
        } else if (page === pagination.last_page + 1) {
            toast('Anda berada dihalaman terakhir')
        } else {
            return getData(page);
        }
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>LIST DATA PENERIMAAN</h3>
                                <span>List Data Penerimaan</span>
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

            <div className="mt-2">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="table-border-start text-center" style={{width: '5%'}}>
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Pembelian</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Tanggal Penerimaan</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Supplier</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Petugas</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Biaya Lain</span>
                                        </th>
                                        <th className="table-border-end text-center" style={{width: '15%'}}>
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        report.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{data.no}</td>
                                                    <td>{data.code}</td>
                                                    <td>
                                                        <Moment format="dddd, DD MMMM YYYY">{data.tgl_penerimaan}</Moment>, {data.waktu} WIB
                                                    </td>
                                                    <td>{data.supplier}</td>
                                                    <td>{data.petugas}</td>
                                                    <td>
                                                        <NumericFormat 
                                                            value={ data.biaya_lain } 
                                                            allowLeadingZeros 
                                                            thousandSeparator="," 
                                                            valueIsNumericString
                                                            prefix="Rp. "
                                                            displayType="text"
                                                            renderText={(value) => <span>{value}</span>}
                                                        />
                                                    </td>
                                                    <td className="text-center">
                                                        <Button onClick={() => handleDetail(data.code)} size="small" variant="contained" color="success">
                                                            Detail
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default ReportPenerimaan
