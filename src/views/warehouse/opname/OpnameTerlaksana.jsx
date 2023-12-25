import React, { useEffect, useState } from 'react'
import Warehouse from '../Warehouse'
import { getOpnameByStatusPelaksanaan } from '../../../models/opname/opname_m';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Moment from 'react-moment';
import { Button } from '@mui/material';

import Paginate from '../../pagination/Paginate'
import { ReplyAll } from '@mui/icons-material';

const OpnameTerlaksana = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { username } = useParams();

    const handleBack = () => {
        return window.location.href = `/${username}/warehouse/opname`
    }

    const [opname, setOpname] = useState([]);
    const [pagination, setPagination] = useState([]);

    const getDataOpname = async(page) => {
        try {
            const data = {
                status_pelaksanaan: 'terlaksana',
                page: page
            }
            const response = await dispatch(getOpnameByStatusPelaksanaan(data)).unwrap().catch((err) => {});
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

    const onDetail = (code) => {
        return navigate(`/${username}/warehouse/opname/terlaksana/${code}`)
    }

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>DATA PELAKSANAAN OPNAME</h3>
                                <span>List Data Opname</span>
                            </div>
                            <div className="d-flex">
                                <div onClick={handleBack} className="text-center me-2" style={{cursor: 'pointer'}}>
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
                                                Tanggal Pelaksanaan
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
                                            <tr key={data.no}>
                                                <td className="text-center">{data.no}</td>
                                                <td>{data.code}</td>
                                                <td>
                                                    <Moment format="dddd, DD MMMM YYYY">{data.tgl_opname}</Moment>
                                                </td>
                                                <td>
                                                    <Moment format="dddd, DD MMMM YYYY">{data.tgl_pelaksanaan}</Moment>
                                                </td>
                                                <td className="text-center">
                                                    { 
                                                        data.status_pelaksanaan === 'belum' ?
                                                        <span className="badge bg-orange">Belum Terlaksana</span> : 
                                                        <span className="badge bg-green">Terlaksana</span>
                                                    }
                                                </td>
                                                <td>
                                                    <div className="d-flex justify-content-center">
                                                        <Button onClick={() => onDetail(data.code)} size="small" variant="contained" color="primary" sx={{mr: 2}}>
                                                            validasi
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

export default OpnameTerlaksana
