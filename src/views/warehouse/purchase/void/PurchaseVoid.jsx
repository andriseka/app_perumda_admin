import React, { useEffect, useState } from 'react'
import Warehouse from '../../Warehouse'
import { BackupTable } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getPurchaseVoid } from '../../../../models/purchase/purchase_void_m'
import Moment from 'react-moment'
import { Button } from '@mui/material'

const PurchaseVoid = () => {
    const dispatch = useDispatch();

    const { username } = useParams();
    const navigate = useNavigate();

    const [dataVoid, setDataVoid] = useState([]);
    const [pagination, setPagination] = useState([]);

    const handleBackPurchase = () => {
        return navigate(`/${username}/warehouse/purchase/form`)
    }

    const getDataVoid = async(page) => {
        try {
            const response = await dispatch(getPurchaseVoid(page)).unwrap().catch((err) => {});
            setDataVoid(response.data);
            setPagination(response.pagination);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataVoid(1);
    }, []);

    return (
        <Warehouse>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{ lineHeight: '60%' }}>
                                <h3>VOID PEMBELIAN</h3>
                                <span>Data Void Pembelian</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={handleBackPurchase} className="text-center me-2" style={{ cursor: 'pointer' }}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem'}}>
                                        <BackupTable sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Pembelian</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '5%'}} className="table-border-start">
                                            <span className="form-control">No</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Kode Transaksi</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Tanggal</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Supplier</span>
                                        </th>
                                        <th style={{width: '15%'}} className="table-border-end text-center">
                                            <span className="form-control">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        dataVoid.map((data) => {
                                            return (
                                                <tr key={data.no}>
                                                    <td className="text-center">{data.no}</td>
                                                    <td>{data.code_purchase_total}</td>
                                                    <td>
                                                        <Moment format="dddd, DD MMMM YYYY : HH.mm.ss">{data.created_at}</Moment> WIB
                                                    </td>
                                                    <td>
                                                        {
                                                            data.json.supplier
                                                        }
                                                    </td>
                                                    <td className="text-center">
                                                        <Button size="small" variant="contained" sx={{backgroundColor: '#ff00a7'}}>
                                                            Lanjutkan
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

export default PurchaseVoid
