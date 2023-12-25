import React, { useEffect, useState } from 'react'

import Warehouse from '../../Warehouse'
import { ReplyAll } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getDetailPurchaseTotal } from '../../../../models/purchase/purchase_total_m'

import { NumericFormat } from 'react-number-format'
import PurchaseTempoTable from './PurchaseTempoTable'
import Moment from 'react-moment'

const PurchaseDataDetail = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleBack = () => {
        return navigate(-1)
    }

    const { username, code } = useParams();

    const [total, setTotal] = useState([]);
    const [list, setList] = useState([]);
    const [tempo, setTempo] = useState([]);

    const [loading, setLoading] = useState(false);

    const getDataDetail = async() => {
        try {
            const response = await dispatch(getDetailPurchaseTotal(code)).unwrap().catch((err) => {});
            if(response.status === 404) {
                setLoading(true);
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/purchase/data` 
                }, 1200);
            }

            if (response.status === 200) {
                setTotal(response.total)
                setTempo(response.tempo)
                setList(response.lists)
            }
        } catch (error) {
            
        }
    }

    // add data operation
    const subTotalPembayaran = list.reduce((i, j) => i + j.sub_total, 0)

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
                                <h3>{ total.code }</h3>
                                <span>Detail Data Pembelian</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={handleBack} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem', borderRadius: '100%',}}>
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
                                        <th>Kode Transaksi</th>
                                        <td>: { total.code }</td>

                                        <th>Supplier</th>
                                        <td>: { total.supplier }</td>

                                        <th>Status Pengiriman</th>
                                        <td>: { total.status_pengiriman === 'dikirim' ? 'Dikirim' : 'Diambil' }</td>
                                    </tr>
                                    <tr>
                                        <th>Tanggal Transaksi</th>
                                        <td>
                                            : <Moment format="dddd, DD MMMM YYYY">{ total.tgl_transaksi }</Moment>
                                        </td>

                                        <th>Sistem Pembayaran</th>
                                        <td>: { total.sistem_pembayaran === 'tempo' ? 'Tempo' : 'Tunai' }</td>

                                        <th>Tanggal Pengiriman</th>
                                        <td>
                                            : <Moment format="dddd, DD MMMM YYYY">{ total.jadwal_pengiriman }</Moment>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Petugas</th>
                                        <td>: { total.petugas }</td>

                                        <th>Metode Pembayaran</th>
                                        <td>: { total.metode_pembayaran === 'cash' ? 'Cash' : 'Transfer' }</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="table-responsive mb-3">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th style={{width: '5%'}} className="table-border-start">
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
                                            <span className="form-control">Merk</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Jumlah</span>
                                        </th>
                                        <th>
                                            <span className="form-control">Harga Satuan</span>
                                        </th>
                                        <th className="table-border-end">
                                            <span className="form-control">Sub Total</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        list.map((data, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className="text-center">
                                                        {index + 1}
                                                    </td>
                                                    <td>
                                                        { data.code_product }
                                                    </td>
                                                    <td>
                                                        { data.product }
                                                    </td>
                                                    <td>
                                                        { data.category }
                                                    </td>
                                                    <td>
                                                        { data.merk }
                                                    </td>
                                                    <td>
                                                        { data.qty }
                                                    </td>
                                                    <td>
                                                        <NumericFormat 
                                                            value={ data.unit_price } 
                                                            allowLeadingZeros 
                                                            thousandSeparator="," 
                                                            valueIsNumericString
                                                            prefix="Rp. "
                                                            displayType="text"
                                                            renderText={(value) => <span>{value}</span>}
                                                        />
                                                    </td>
                                                    <td>
                                                        <NumericFormat 
                                                            value={ data.sub_total } 
                                                            allowLeadingZeros 
                                                            thousandSeparator="," 
                                                            valueIsNumericString
                                                            prefix="Rp. "
                                                            displayType="text"
                                                            renderText={(value) => <span>{value}</span>}
                                                        />
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                    <tr>
                                        <th colSpan={7}>
                                            SUB TOTAL PEMBAYARAN
                                        </th>
                                        <th>
                                            <NumericFormat 
                                                value={ subTotalPembayaran } 
                                                allowLeadingZeros 
                                                thousandSeparator="," 
                                                valueIsNumericString
                                                prefix="Rp. "
                                                displayType="text"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        </th>
                                    </tr>

                                    <tr>
                                        <th colSpan={7}>
                                            PPN
                                        </th>
                                        <th>
                                            <NumericFormat 
                                                value={ total.ppn } 
                                                allowLeadingZeros 
                                                thousandSeparator="," 
                                                valueIsNumericString
                                                prefix="Rp. "
                                                displayType="text"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        </th>
                                    </tr>

                                    <tr>
                                        <th colSpan={7}>
                                            TOTAL PEMBAYARAN
                                        </th>
                                        <th>
                                            <NumericFormat 
                                                value={ total.total_pembayaran } 
                                                allowLeadingZeros 
                                                thousandSeparator="," 
                                                valueIsNumericString
                                                prefix="Rp. "
                                                displayType="text"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {
                            total.sistem_pembayaran === 'tempo' ? 
                            <PurchaseTempoTable tempo={tempo} /> : ''
                        }
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default PurchaseDataDetail
