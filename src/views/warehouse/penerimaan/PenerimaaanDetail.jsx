import React, { useEffect, useState } from 'react'
import Warehouse from '../Warehouse'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailPurchaseTotal } from '../../../models/purchase/purchase_total_m';
import { useDispatch } from 'react-redux';
import { ReplyAll } from '@mui/icons-material';
import Moment from 'react-moment';

import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format'
import { Button, TextField } from '@mui/material';
import Loading from '../../loading/Loading';
import { storeReportPenerimaan } from '../../../models/penerimaan/report_penerimaan_m';
import toast from 'react-hot-toast';

import { imageResizer } from '../../../utils'

const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    props,
    ref,
) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
                    target: {
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            valueIsNumericString
            prefix="Rp. "
        />
    );
});

NumericFormatCustom.propTypes = {
    onChange: PropTypes.func.isRequired,
};

const PenerimaaanDetail = () => {
    const { username, code } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = date.getHours() + '.' + date.getMinutes() + '.' + date.getSeconds();

    const date_now = new Date().toLocaleString() + '';

    const handleBack = () => {
        return navigate(-1)
    }

    const [total, setTotal] = useState([]);
    const [list, setList] = useState([]);

    const [penerimaan, setPenerimaan] = useState();

    const [loading, setLoading] = useState(false);

    const [select, setSelect] = useState({
        biaya_operasional_product: '', desc: '', file: ''
    })

    const getDetail = async() => {
        try {
            const response = await dispatch(getDetailPurchaseTotal(code)).unwrap().catch((err) => {});
            if(response.status === 404) {
                setLoading(true);
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/penerimaan/data` 
                }, 1200);
            }

            if (response.status === 200) {
                setTotal(response.total)
                setList(response.lists)
                setPenerimaan(response.lists.map((i) => ({
                    code_product: i.code_product,
                    product: i.product,
                    category: i.category,
                    qty: i.qty,
                    unit_price: i.unit_price,
                    sub_total: i.sub_total,
                    accept_qty: ''
                })))
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDetail();
    }, []);

    const handleChange = (e, code_product) => {
        const data = penerimaan.map(obj => {
            if (obj.code_product === code_product) {
                return {...obj, accept_qty: e.target.value}
            }
            return obj;
        })
        setPenerimaan(data);
    }

    const handleChangeFile = async(e) => {
        const file = e.target.files[0];
        const resizer = await imageResizer(file, 240, 240);
        setSelect({
            ...select, file: resizer
        })
    }

    const onSubmit = async(e) => {
        e.preventDefault()

        setLoading(true);

        if (select.biaya_operasional_product == '') {
            select.biaya_operasional_product = 0
        } else {
            select.biaya_operasional_product = select.biaya_operasional_product
        }

        const data = {
            code_purchase_total : total.code,
            tgl_penerimaan : `${year}-${month}-${day}`,
            waktu: `${time}`,
            petugas: 'Andris Eka Adi Saputra',
            code_supplier : total.code_supplier,
            supplier: total.supplier,
            total_pembayaran: total.total_pembayaran,
            ppn: total.ppn,
            biaya_operasional_product: select.biaya_operasional_product,
            desc: select.desc,
            file: select.file,
            penerimaan_lists : {...penerimaan}
        }
        
        try {
            const response = await dispatch(storeReportPenerimaan(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                toast.success('Data berhasil di validasi');
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/penerimaan/data` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }
    return (
        <Warehouse>
            { loading ? <Loading /> : '' }
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
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-9 mb-3">
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

                                                </tr>
                                                <tr>
                                                    <th>Tanggal Transaksi</th>
                                                    <td>
                                                        : <Moment format="dddd, DD MMMM YYYY">{ total.tgl_transaksi }</Moment>
                                                    </td>

                                                    <th>Status Pengiriman</th>
                                                    <td>: { total.status_pengiriman === 'dikirim' ? 'Dikirim' : 'diambil' }</td>
                                                </tr>
                                                <tr>
                                                    <th>Petugas</th>
                                                    <td>: { total.petugas }</td>

                                                    <th>Tanggal Pengiriman</th>
                                                    <td>
                                                        : <Moment format="dddd, DD MMMM YYYY">{ total.jadwal_pengiriman }</Moment>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="table-responsive mb-3">
                                        <table className="table align-middle">
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
                                                    <th style={{width: '15%'}} className="text-center">
                                                        <span className="form-control">Jumlah Pembelian</span>
                                                    </th>
                                                    <th style={{width: '15%'}} className="table-border-end text-center">
                                                        <span className="form-control">Jumlah Diterima</span>
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
                                                                <td className="text-center">
                                                                    { data.qty }
                                                                </td>
                                                                <td>
                                                                    <TextField 
                                                                        size="small"
                                                                        fullWidth
                                                                        type="number"
                                                                        onChange={(e) => handleChange(e, data.code_product)}
                                                                        required
                                                                    />
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

                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label" style={{marginBottom: 0}}>Tanggal Penerimaan</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            value={date_now}
                                            disabled
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Total Biaya Lainnya</label>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={select.biaya_operasional_product}
                                            onChange={(e) => setSelect({...select, biaya_operasional_product: e.target.value})}
                                            placeholder="Rp. "
                                            InputProps={{
                                                inputComponent: NumericFormatCustom,
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Keteragan</label>
                                        <textarea onChange={(e) => setSelect({...select, desc: e.target.value})} style={{height: '80px'}} className="form-control" placeholder="Tulis Keterangan"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Upload Bukti Penerimaan</label>
                                        <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" onChange={handleChangeFile} required />
                                    </div>
                                    <div>
                                        <Button type="submit" fullWidth variant="contained" sx={{backgroundColor: '#ff00a7'}}>
                                            Validasi Penerimaan
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Warehouse>
    )
}

export default PenerimaaanDetail
