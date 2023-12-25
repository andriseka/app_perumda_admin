import React, { useEffect, useState } from 'react'
import Warehouse from '../../Warehouse'
import { BackupTable } from '@mui/icons-material'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailPurchaseTotal } from '../../../../models/purchase/purchase_total_m'

import PropTypes from 'prop-types';
import { NumericFormat } from 'react-number-format';
import { Button, TextField } from '@mui/material'
import Moment from 'react-moment'
import { updatePurchaseCredit } from '../../../../models/purchase/purchase_credit_m'
import toast from 'react-hot-toast'

import Loading from '../../../loading/Loading'

import { imageResizer } from '../../../../utils'

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

const PurchaseTempoDetail = () => {
    const dispatch = useDispatch();

    const { username, code } = useParams();
    const navigate = useNavigate();

    const onClickPurchaseData = () => {
        return navigate(`/${username}/warehouse/purchase/tempo/data`)
    }

    const [total, setTotal] = useState([]);
    const [tempo, setTempo] = useState([]);
    const [list, setList] = useState([]);
    const [validation, setValidation] = useState({
        status: false, message: ''
    });

    const [bayar, setBayar] = useState([]);

    const [select, setSelect] = useState({
        id: '', nominal_bayar: '', image: ''
    })

    const [loading, setLoading] = useState(false);

    const getPurchaseDetail = async() => {
        try {
            const response = await dispatch(getDetailPurchaseTotal(code)).unwrap().catch((err) => {});
            if (response.status === 200) {
                setTotal(response.total)
                setList(response.lists);
                setTempo(response.tempo)
            } else {
                setLoading(true)
                toast.error('Data tidak ditemukan')
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/purchase/tempo/data` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getPurchaseDetail()
    }, []);

    let subTotalPembayaran = list.reduce((i, j) => i + j.sub_total, 0)
    let nominalBayar = bayar.reduce((i, j) => i + j.nominal_bayar, 0)

    const handleValidation = (e) => {
        if (nominalBayar === 0) {
            setValidation({
                status: true,
                message: 'Silahkan pilih nominal yang akan dibayarkan'
            })
        } else {
            if (parseFloat(e.target.value) !== nominalBayar) {
                setSelect({
                    nominal_bayar: ''
                })
                setValidation({
                    status: true,
                    message: `Nominal yang harus anda bayar Rp. ${nominalBayar}`
                })
            } else {
                setValidation({
                    status: false,
                    message: ``
                })
                setSelect({
                    ...select,
                    nominal_bayar: e.target.value
                })
            }
        }
    }

    const isFound = bayar.some(element => {
        if (element.id === select.id) {
            return true;
        }
        return false;
    })

    const handleBayar = (nominal, id) => {
        setSelect({
            id: id
        })
       const isFound =  bayar.some(element => {
            if (element.id === id) {
                return true;
            }
            return false;
        })
        if (isFound === true) {
            alert('Data sudah dimasukkan')
        } else {
            setBayar([
                ...bayar,
                {
                    id: id,
                    nominal_bayar: nominal
                }
            ])
        }
    }

    const handleCancleBayar = (index) => {
        const neswList = Array.from(bayar);
        neswList.splice(index, 1);
        setBayar(neswList)
        setSelect({...select, nominal_bayar: ''})
    }

    const handleChangeImage = async(e) => {
        const file = e.target.files[0];
        const resizer = await imageResizer(file, 240, 240);
        setSelect({...select, image: resizer});
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);
        const data = {
            credits : {...bayar},
            code_purchase_total: total.code,
            nominal_total : nominalBayar,
            file: select.image
        }
        try {
            const response = await dispatch(updatePurchaseCredit(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Transaksi tempo berhasil')
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/purchase/data` 
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
                                <h3>DATA PEMBELIAN TEMPO</h3>
                                <span>List Data Pembelian Tempo</span>
                            </div>
                            <div className="d-flex">
                                <div onClick={onClickPurchaseData} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-primary" style={{padding: '.4rem .4rem'}}>
                                        <BackupTable sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Data Tempo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
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
                                                <td>: {total.supplier}</td>
                                            </tr>
                                            <tr>
                                                <th>Tanggal Transaksi</th>
                                                <td>
                                                    : <Moment format="dddd, DD MMMM YYYY">{ total.tgl_transaksi }</Moment>
                                                </td>
                                                <th>Jadwal Pengiriman</th>
                                                <td>
                                                    : <Moment format="dddd, DD MMMM YYYY">{ total.jadwal_pengiriman }</Moment>
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Petugas</th>
                                                <td>: { total.petugas }</td>
                                                <th>Status Pengiriman</th>
                                                <td>: {total.status_pengiriman === 'dikirim' ? 'Dikirim' : 'Diambil'}</td>
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
                                                    <span className="form-control">Nama Produk</span>
                                                </th>
                                                <th>
                                                    <span className="form-control">Jumlah</span>
                                                </th>
                                                <th>
                                                    <span className="form-control">Harga Satuan</span>
                                                </th>
                                                <th>
                                                    <span className="form-control">Sub Total</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                list.map((data, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td>{data.product}</td>
                                                            <td>{data.qty}</td>
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
                                                <th colSpan={4}>SUB TOTAL PEMBAYARAN</th>
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
                                                <th colSpan={4}>PPN</th>
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
                                                <th colSpan={4}>TOTAL PEMBAYARAN</th>
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

                                <div className="table-responsive">
                                    <div className="table table">
                                       <table className="table">
                                            <thead>
                                                <tr>
                                                    <th style={{width: '5%'}} className="table-border-start">
                                                        <span className="form-control">No</span>
                                                    </th>
                                                    <th>
                                                        <span className="form-control">Tanggal Tempo</span>
                                                    </th>
                                                    <th>
                                                        <span className="form-control">Nominal</span>
                                                    </th>
                                                    <th>
                                                        <span className="form-control">Terbayar</span>
                                                    </th>
                                                    <th className="text-center table-border-end" style={{width: '15%'}}>
                                                        <span className="form-control">Action</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    tempo.map((data, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>
                                                                    <Moment format="dddd, DD MMMM YYY">{data.date}</Moment>
                                                                </td>
                                                                <td>
                                                                    <NumericFormat 
                                                                        value={ data.nominal } 
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
                                                                        value={ data.terbayar } 
                                                                        allowLeadingZeros 
                                                                        thousandSeparator="," 
                                                                        valueIsNumericString
                                                                        prefix="Rp. "
                                                                        displayType="text"
                                                                        renderText={(value) => <span>{value}</span>}
                                                                    />
                                                                </td>
                                                                <td className="text-center">
                                                                    <Button onClick={() => handleBayar(data.nominal, data.id)} disabled={ data.nominal !== data.terbayar ? false : true } variant="contained" sx={{backgroundColor: '#ff00a7'}} size="small">
                                                                        Bayar
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
                    </div>

                    <div className="col-md-3 mb-3">
                        <form onSubmit={onSubmit}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-price mb-3">
                                        <div className="d-flex justify-content-between align-items-center mb-2 card-price-title">
                                            <span>
                                                Total yang harus dibayar
                                            </span>
                                            <span>
                                                { total.code }
                                            </span>
                                        </div>

                                        <div className="text-center price-total">
                                            <NumericFormat 
                                                value={ nominalBayar } 
                                                allowLeadingZeros 
                                                thousandSeparator="," 
                                                valueIsNumericString
                                                prefix="Rp. "
                                                displayType="text"
                                                renderText={(value) => <span>{value}</span>}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        {
                                            bayar.map((data, index) => {
                                                return (
                                                    <div key={index} className="d-flex justify-content-between align-items-center mb-2">
                                                        <small>Nominal {index + 1}</small>
                                                        <small>
                                                            <NumericFormat 
                                                                value={ data.nominal_bayar } 
                                                                allowLeadingZeros 
                                                                thousandSeparator="," 
                                                                valueIsNumericString
                                                                prefix="Rp. "
                                                                displayType="text"
                                                                renderText={(value) => <span>{value}</span>}
                                                            />
                                                        </small>
                                                        <small onClick={() => handleCancleBayar(index)} className="btn btn-danger btn-sm">
                                                            Cancel
                                                        </small>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" style={{marginBottom: 0}}>Nominal Bayar</label>
                                        <TextField
                                            error={validation.status}
                                            fullWidth
                                            size="small"
                                            value={select.nominal_bayar}
                                            onChange={handleValidation}
                                            placeholder="Rp. "
                                            InputProps={{
                                                inputComponent: NumericFormatCustom,
                                            }}
                                            required
                                        />
                                        <small className="text-danger">{ validation.message ? validation.message : '' }</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label" style={{marginBottom: 0}}>Bukti Pembayaran</label>
                                        <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" onChange={handleChangeImage} required />
                                    </div>
                                    
                                    <div>
                                        <Button type="submit" disabled={select.nominal_bayar ? false : validation.status ? true : true} variant="contained" color="success" fullWidth>
                                            Bayar
                                        </Button>
                                    </div>
                                </div>  
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Warehouse>
    )
}

export default PurchaseTempoDetail
