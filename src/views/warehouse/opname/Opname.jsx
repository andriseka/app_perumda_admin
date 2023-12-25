import React, { useEffect, useState } from 'react'

import Warehouse from '../Warehouse'
import { Button } from '@mui/material'
import { CalendarMonth, TableRows, TableView } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getOpname, getOpnameByStatusValidasi } from '../../../models/opname/opname_m'
import Moment from 'react-moment'

import Paginate from '../../pagination/Paginate'

const Opname = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onDetail = (code) => {
        return window.location.href = `opname/validasi/${code}`
    }

    const handleOpnameTerlaksana = () => {
        return navigate(`/${username}/warehouse/opname/terlaksana`)
    }

    const handleOpnameScheduleForm = () => {
        return navigate(`/${username}/warehouse/opname/schedule/form`)
    }

    const handleOpnameSchedule = () => {
        return navigate(`/${username}/warehouse/opname/data`)
    }

    const [opname, setOpname] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataOpname = async(page) => {
        try {
            const data = {
                validasi: 'tidak',
                page: page
            }
            const response = await dispatch(getOpnameByStatusValidasi(data)).unwrap().catch((err) => {});
            setOpname(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataOpname(1);
    }, []);

    const handlePagination = (_, page) => {
        return getDataOpname(page);
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>VALIDASI JADWAL OPNAME</h3>
                                <span>List Jadwal Opname</span>
                            </div>
                            <div className="d-flex">
                                <div onClick={handleOpnameTerlaksana} className="text-center me-3" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-primary" style={{padding: '.4rem .4rem'}}>
                                        <TableRows sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Data Opname</span>
                                </div>
                                <div onClick={handleOpnameSchedule} className="text-center me-3" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem'}}>
                                        <TableView sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Jadwal Opname</span>
                                </div>
                                <div onClick={handleOpnameScheduleForm} className="text-center" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-pink" style={{padding: '.4rem .4rem'}}>
                                        <CalendarMonth sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Buat Jadwal</span>
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
                                                Kode Opname
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Tanggal Opname
                                            </span>
                                        </th>
                                        <th>
                                            <span className="form-control fw-bold">
                                                Pelaksanaan
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
                                    {
                                        opname.map((data) => (
                                            <tr>
                                                <td className="text-center">{data.no}</td>
                                                <td>{data.code}</td>
                                                <td>
                                                    <Moment format="dddd, DD MMMM YYYY">{data.tgl_opname}</Moment>
                                                </td>
                                                <td>
                                                    { 
                                                        data.status_pelaksanaan === 'belum' ?
                                                        <span className="badge bg-orange">Belum Terlaksana</span> : 
                                                        <span className="badge bg-green">Terlaksana</span>
                                                    }
                                                </td>
                                                <td className="text-center text-green">
                                                    { 
                                                        data.validasi === 'tidak' ?
                                                        <span className="badge bg-orange">Belum Tervalidasi</span> : 
                                                        <span className="badge bg-green">Tervalidasi</span>
                                                    }
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <Button onClick={() => onDetail(data.code)} size="small" variant="contained" color={data.validasi === 'iya' ? 'success' : 'primary'} sx={{mr: 2}}>
                                                            { data.validasi === 'iya' ? 'Detail' : 'validasi' }
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* pagination */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <span>Halaman : { pagination.current_page ? pagination.current_page : '' }</span>
                            </div>
                            {
                                pagination.pagination ? 
                                <Paginate count={pagination.total} page={pagination.current_page} onChange={handlePagination} /> : ''
                            }
                            <div>
                                <span>Total : { pagination.total ? pagination.total : '' } Jadwal Opname</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default Opname
