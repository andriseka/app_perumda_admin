import React, { useState } from 'react'
import Warehouse from '../../Warehouse'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ExpandMore, PendingActions, TableView } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, MenuItem, Select, TextField, Typography } from '@mui/material';
import { getSearchCodeNameSupplier } from '../../../../models/supplier/supplier_m';
import { getSearchProductMerkByCategoryCodeName } from '../../../../models/product/product_merk_m';
import { getProductByMerkCodeNameSearch } from '../../../../models/product/product_m';


import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import { DatePicker } from '@mui/x-date-pickers';
import { storePurchaseTotal } from '../../../../models/purchase/purchase_total_m';

import Loading from '../../../loading/Loading'
import toast from 'react-hot-toast';

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

const PurchaseForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { username } = useParams();

    const onClickData = () => {
        return navigate(`/${username}/warehouse/purchase/data`)
    }

    const onClickDataVoid = () => {
        return navigate(`/${username}/warehouse/purchase/void/data`)
    }
    
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const waktu = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const date_now = date.toLocaleString() + '';

    const [input, setInput] = useState({
        code: `TR${day}${month}${year}${time}`, date_now: date_now, tgl_transasksi: `${year}-${month}-${day}`, waktu_transaksi: waktu,
        petugas: 'Andris Eka', code_supplier: '', supplier: '', code_category: '', category: '',
        code_merk: '', merk: '', code_product: '', product: '', unit: '', desc: '',
        ppn: 'non', tempo_1: '', nominal_tempo_1: '', tempo_2: '', nominal_tempo_2: '',
        metode_pembayaran: '', nominal_bayar: '', nama_bank: '', nama_pemilik_rekening: '',
       jadwal_pengiriman: '', status_pengiriman: '', file: ''
    })

    const [price, setPrice] = useState({
        unit_price: '', qty: '', sub_total: '', status_nominal: '', nominal_bayar: ''
    })
    const [loading, setLoading] = useState(false);

    const [list, setList] = useState([]);
    // price sub_total, ppn, and total pembayaran 
    let sub_total_pembayaran = list.reduce((i, j) => i + j.sub_total, 0)
    let ppn_price = 0
    if (input.ppn === 'ppn') {
        ppn_price = (11 / 100) * sub_total_pembayaran
    } else {
        ppn_price = 0
    }
    let total_pembayaran = sub_total_pembayaran + ppn_price;

    // get data
    const [supplier, setSupplier] = useState([]);
    const [category, setCategory] = useState([]);
    const [merk, setMerk] = useState([]);
    const [product, setProduct] = useState([]);

    const getSearchSupplier = async(code_name_search) => {
        try {
            const response = await dispatch(getSearchCodeNameSupplier(code_name_search)).unwrap().catch((err) => {});
            setSupplier(response.data.map((i) => ({ code: i.code, name: i.name, label: `${i.code} - ${i.name}`, category: i.category })))
        } catch (error) {
            
        }
    }

    const getSearchMerk = async(data) => {
        try {
            const response = await dispatch(getSearchProductMerkByCategoryCodeName(data)).unwrap().catch((err) => {});
            setMerk(response.data.map((i) => ({ code: i.code, name: i.name, label: `${i.code} - ${i.name}` })))
        } catch (error) {
            
        }
    }

    const getSearchProduct = async(data) => {
        try {
            const response = await dispatch(getProductByMerkCodeNameSearch(data)).unwrap().catch((err) => {});
            setProduct(response.data.map((i) => ({ code: i.code, unit: i.unit, name: i.name, desc: i.desc, label: `${i.code} - ${i.name}` })))
        } catch (error) {
            
        }
    }

    // handle search
    const handleSearchSupplier = (e) => {
        if (e.target.value !== '') {
            return getSearchSupplier(e.target.value);
        }
    }

    const handleSearchMerk = (e) => {
        if (e.target.value !== '') {
            const data = {
                code_category: input.code_category,
                code_name_search: e.target.value
            }
            return getSearchMerk(data)
        }
    }

    // handle change
    const handleChangeSupplier = (_, event) => {
        if (event) {
            setCategory(event.category)
            setInput({...input, code_supplier: event.code, supplier: event.name})
        }
    }

    const handleChangeCategory  = (_, event) => {
        if (event) {
            const split = event.split(' - ');
            setInput({...input, 
                code_category: split[0], category: split[1], 
                code_merk: '', merk: '', code_product: '', product: '',
                unit: '', desc: ''
            })
            setMerk([])
            setProduct([])
            const data = {
                code_category: split[0],
                code_name_search: '-'
            }
            return getSearchMerk(data);
        }    
    }
    
    const handleChangeMerk = (_, event) => {
        if (event) {
            setInput({...input, 
                code_merk: event.code, merk: event.name,
                code_product: '', product: '',
                unit: '', desc: ''
            })
            setProduct([])
            const data = {
                code_merk : event.code,
                code_name_search: '-'
            }
            return getSearchProduct(data);
        }
    }

    const handleChangeProduct = (_, event) => {
        if (event) {
            setInput({
                ...input, code_product: event.code, product: event.name,
                unit: event.unit, desc: event.desc
            })
        }
    }

    const handleChangeFile = async(e) => {
        const file = e.target.files[0];
        const resizer = await imageResizer(file, 240, 240)
        setInput({...input, file: resizer})
    }

    const handleChangeNominalBayar = (e) => {
        let nominal = parseFloat(e.target.value);
        if (nominal !== '') {
            if (input.tempo_1 !== '') {
                if (nominal !== input.nominal_tempo_1) {
                    setPrice({...price, status_nominal: true, nominal_bayar: input.nominal_tempo_1})
                } else {
                    setInput({...input, nominal_bayar: nominal})
                    setPrice({...price, status_nominal: false})
                }
            } else {
                if (nominal === total_pembayaran) {
                    setInput({...input, nominal_bayar: nominal})
                    setPrice({...price, status_nominal: false})
                } else {
                    setPrice({...price, status_nominal: true, nominal_bayar: total_pembayaran})
                }
            }
        } else {
            setPrice({...price, status_nominal: false})
            setInput({...input, nominal_bayar: ''})
        }     

    }

    // handle change price
    const handleChangePrice = (e) => {
        if (e.target.value !== '') {
            const sub_total = e.target.value * price.qty
            setPrice({...price, sub_total: sub_total, unit_price: e.target.value})
        } else {
            setPrice({...price, sub_total: 0, unit_price: e.target.value})
        }
    }

    const handleChangeQty = (e) => {
        if (e.target.value !== '') {
            const sub_total = price.unit_price * e.target.value;
            setPrice({...price, sub_total: sub_total, qty: e.target.value})
        } else {
            setPrice({...price, sub_total: 0, qty: ''})
        }
    }

    const handleChangeUpdateUnitPrice = (e, code) => {
        const data = list.map(obj => {
            if (obj.code === code) {
                const sub_total_update = obj.qty * e.target.value
                return {...obj, sub_total: sub_total_update, unit_price: e.target.value}
            }
            return obj;
        })
        setList(data);
    }

    const handleQtyUpdate = (e, code) => {
        const data = list.map(obj => {
            if (obj.code === code) {
                const sub_total_update = obj.unit_price * e.target.value;
                return {...obj, sub_total: sub_total_update, qty: e.target.value}
            }
            return obj;
        })
        setList(data);
    }

    // on add list product
    const isFound = list.some(element => {
        if (element.code === input.code_product) {
            return true;
        }
        return false;
    });

    const onAddProduct = () => {
        if (isFound === true) {
            setInput({
                ...input,
                code_category: '', category: '', code_product: '', 
                product: '', code_merk: '', merk: '',
            })
            setPrice({
                unit_price: '', qty: '', sub_total: ''
            })
            alert('Data sudah di masukkan')
        } else {
            setList([
                ...list,
                {
                    code: input.code_product,
                    code_category: input.code_category,
                    code_merk: input.code_merk,
                    product: input.product,
                    category: input.category,
                    merk: input.merk,
                    unit: input.unit,
                    unit_price: price.unit_price,
                    qty: price.qty,
                    sub_total: price.sub_total
                }
            ])
            setInput({
                ...input,
                code_category: '', category: '', code_product: '', 
                product: '', code_merk: '', merk: '',
            })
            setPrice({
                unit_price: '', qty: '', sub_total: ''
            })
        }
    }

    const onDeleteProduct = (index) => {
        const neswList = Array.from(list);
        neswList.splice(index, 1);
        setList(neswList)
    }
    
    const biodataTransfer = (
        <>
            <div className="mb-3">
                <label className="form-label">Nama Bank</label>
                <TextField 
                    size="small"
                    fullWidth
                    placeholder="Nama Bank"
                    onChange={(e) => setInput({...input, nama_bank: e.target.value})}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Nama Pemilik Rekening</label>
                <TextField 
                    size="small"
                    fullWidth
                    placeholder="Nama Pemilik Rekening"
                    onChange={(e) => setInput({...input, nama_pemilik_rekening: e.target.value})}
                />
            </div>
        </>
    )

    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        if (input.nominal_bayar === '') {
            input.nominal_bayar = 0
        } else {
            input.nominal_bayar = input.nominal_bayar
        }

        const data = {
            code: input.code,
            code_supplier: input.code_supplier,
            tgl_transaksi: input.tgl_transasksi,
            waktu_transaksi: input.waktu_transaksi,
            bulan: month,
            tahun: year,
            supplier: input.supplier,
            petugas: input.petugas,
            sistem_pembayaran: input.tempo_1 !== '' || input.tempo_2 !== '' || input.nominal_tempo_1 !== '' || input.nominal_tempo_2 !== '' ? 'tempo' : 'tunai',
            metode_pembayaran: input.metode_pembayaran,
            jadwal_pengiriman: input.jadwal_pengiriman,
            total_pembayaran: total_pembayaran,
            nominal_bayar: input.nominal_bayar,
            status_ppn: input.ppn,
            ppn: ppn_price,
            tempo_1: input.tempo_1,
            tempo_2: input.tempo_2,
            nominal_tempo_1: input.nominal_tempo_1,
            nominal_tempo_2: input.nominal_tempo_2,
            file: input.file,
            nama_bank: input.nama_bank,
            nama_pemilik_rekening: input.nama_pemilik_rekening,
            status_pengiriman: input.status_pengiriman,
            products: {...list}
        }

        try {
            const response = await dispatch(storePurchaseTotal(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                toast.success('Data berhasil disimpan');
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
                            <div style={{ lineHeight: '60%' }}>
                                <h3>PEMBELIAN</h3>
                                <span>Transaksi Pembelian</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={onClickData} className="text-center me-2" style={{ cursor: 'pointer' }}>
                                    <span className="btn btn-icon btn-primary" style={{ padding: '.4rem .4rem' }}>
                                        <TableView sx={{ width: '1.25rem', height: '1.25rem' }} />
                                    </span>
                                    <span style={{ fontSize: '12px' }} className="d-block">Data</span>
                                </div>

                                <div onClick={onClickDataVoid} className="text-center me-2" style={{ cursor: 'pointer' }}>
                                    <span className="btn btn-icon btn-pink" style={{ padding: '.4rem .4rem' }}>
                                        <PendingActions sx={{ width: '1.25rem', height: '1.25rem' }} />
                                    </span>
                                    <span style={{ fontSize: '12px' }} className="d-block">Void</span>
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
                                    <div className="card-in mb-3">
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Kode Transaksi</label>
                                                <TextField 
                                                    size="small"
                                                    fullWidth
                                                    value={input.code}
                                                    disabled
                                                    sx={{'.Mui-disabled': { backgroundColor: '#00000012' }}}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Tanggal Transaksi</label>
                                                <TextField 
                                                    size="small"
                                                    fullWidth
                                                    value={input.date_now}
                                                    disabled
                                                    sx={{'.Mui-disabled': { backgroundColor: '#00000012' }}}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Petugas</label>
                                                <TextField 
                                                    size="small"
                                                    fullWidth
                                                    value={input.petugas}
                                                    disabled
                                                    sx={{'.Mui-disabled': { backgroundColor: '#00000012' }}}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-in">
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Supplier</label>
                                                <Autocomplete 
                                                    disabled={ input.code_supplier ? true : false }
                                                    size="small"
                                                    fullWidth
                                                    options={supplier}
                                                    disableClearable
                                                    renderInput={(params) => <TextField {...params} placeholder="Supplier" required onChange={handleSearchSupplier} />}
                                                    onChange={handleChangeSupplier}
                                                />
                                            </div>

                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Kategori Produk</label>
                                                <Autocomplete 
                                                    size="small"
                                                    fullWidth
                                                    options={category}
                                                    disableClearable
                                                    value={input.category}
                                                    isOptionEqualToValue={(option) => option.label}
                                                    renderInput={(params) => <TextField {...params} placeholder="Kategori Produk" />}
                                                    onChange={handleChangeCategory}
                                                />
                                            </div>

                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Merk Produk</label>
                                                <Autocomplete 
                                                    size="small"
                                                    fullWidth
                                                    options={merk}
                                                    value={input.merk}
                                                    disableClearable
                                                    isOptionEqualToValue={(option) => option.label}
                                                    renderInput={(params) => <TextField {...params} placeholder="Merk Produk" onChange={handleSearchMerk} />}
                                                    onChange={handleChangeMerk}
                                                />
                                            </div>
                                        </div>

                                        <div className="row align-items-end">
                                            <div className="col-md-3 mb-2">
                                                <label className="form-label form-label-m-0">Nama Produk</label>
                                                <Autocomplete 
                                                    disableClearable
                                                    size="small"
                                                    fullWidth
                                                    options={product}
                                                    isOptionEqualToValue={(option) => option.label}
                                                    value={input.product}
                                                    renderInput={(params) => <TextField {...params} placeholder="Nama Produk" />}
                                                    onChange={handleChangeProduct}
                                                />
                                            </div>
                                            <div className="col-md-1 mb-2">
                                                <Button sx={{padding: '8.5px 14px', backgroundColor: '#c90785'}} fullWidth variant="contained" color="primary">
                                                    Scan
                                                </Button>
                                            </div>
                                            <div className="col-md-2 mb-2">
                                                <label className="form-label form-label-m-0">Harga Satuan</label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={ price.unit_price }   
                                                    onChange={handleChangePrice}
                                                    placeholder="Rp. "
                                                    InputProps={{
                                                        inputComponent: NumericFormatCustom,
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-1 mb-2">
                                                <label className="form-label form-label-m-0">Unit</label>
                                                <TextField 
                                                    size="small"
                                                    fullWidth
                                                    value={input.unit ? input.unit : 'Auto'}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-md-1 mb-2">
                                                <label className="form-label form-label-m-0">Jumlah</label>
                                                <TextField 
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Jml"
                                                    type="number"
                                                    value={price.qty}
                                                    onChange={handleChangeQty}
                                                />
                                            </div>
                                            <div className="col-md-3 mb-2">
                                                <label className="form-label form-label-m-0">Sub Total</label>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    value={ price.sub_total ? price.sub_total : 0 }   
                                                    placeholder="Rp. "
                                                    InputProps={{
                                                        inputComponent: NumericFormatCustom,
                                                    }}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-md-1 mb-2">
                                                <Button onClick={onAddProduct} sx={{padding: '8.5px 14px'}} fullWidth variant="contained" color="primary">
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <div className="table-responsive">
                                            <table className="table align-middle">
                                                <thead>
                                                    <tr>
                                                        <th className="table-border-start text-center" style={{width: '5%'}}>
                                                            <span className="form-control">No</span>
                                                        </th>
                                                        <th>
                                                            <span className="form-control">Kode</span>
                                                        </th>
                                                        <th>
                                                            <span className="form-control">Produk</span>
                                                        </th>
                                                        <th style={{width: '15%'}}>
                                                            <span className="form-control">Harga Satuan</span>
                                                        </th>
                                                        <th style={{width: '10%'}}>
                                                            <span className="form-control">Jumlah</span>
                                                        </th>
                                                        <th style={{width: '15%'}}>
                                                            <span className="form-control">Sub Total</span>
                                                        </th>
                                                        <th className="table-border-end text-center" style={{width: '15%'}}>
                                                            <span className="form-control">Action</span>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        list.map((data, index) => (
                                                            <tr key={index}>
                                                                <td className="text-center">{index + 1}</td>
                                                                <td>{data.code}</td>
                                                                <td>{data.product}</td>
                                                                <td>
                                                                    <TextField
                                                                        fullWidth
                                                                        size="small"
                                                                        value={ data.unit_price } 
                                                                        onChange={(e) => handleChangeUpdateUnitPrice(e, data.code)}
                                                                        placeholder="Rp. "
                                                                        InputProps={{
                                                                            inputComponent: NumericFormatCustom,
                                                                        }}
                                                                    />
                                                                </td>
                                                                <td className="text-center">
                                                                    <TextField 
                                                                        fullWidth
                                                                        size="small"
                                                                        type="number"
                                                                        defaultValue={ data.qty } 
                                                                        onChange={(e) => handleQtyUpdate(e, data.code)}
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
                                                                <td className="text-center">
                                                                    <button onClick={() => onDeleteProduct(index)} className="btn btn-danger btn-sm" >
                                                                        Cancel
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }

                                                    {/* sub total pembayaran */}
                                                    <tr>
                                                        <th colSpan={5}>SUB TOTAL PEMBAYARAN</th>
                                                        <th colSpan={2}>
                                                            <NumericFormat 
                                                                value={ sub_total_pembayaran } 
                                                                allowLeadingZeros 
                                                                thousandSeparator="," 
                                                                valueIsNumericString
                                                                prefix="Rp. "
                                                                displayType="text"
                                                                renderText={(value) => <span>{value}</span>}
                                                            />
                                                        </th>
                                                    </tr>

                                                    {/* ppn */}
                                                    <tr>
                                                        <th colSpan={5}>PPN</th>
                                                        <td>
                                                            <select className="form-select" onChange={(e) => setInput({...input, ppn: e.target.value})}>
                                                                <option value="non">NON PPN</option>
                                                                <option value="ppn">PPN</option>
                                                            </select>
                                                        </td>
                                                        <th>
                                                            <NumericFormat 
                                                                value={ ppn_price } 
                                                                allowLeadingZeros 
                                                                thousandSeparator="," 
                                                                valueIsNumericString
                                                                prefix="Rp. "
                                                                displayType="text"
                                                                renderText={(value) => <span>{value}</span>}
                                                            />
                                                        </th>
                                                    </tr>

                                                    {/* total pembayaran */}
                                                    <tr>
                                                        <th colSpan={5}>TOTAL PEMBAYARAN</th>
                                                        <th colSpan={2}>
                                                            <NumericFormat 
                                                                value={ total_pembayaran } 
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-price mb-2">
                                        <div className="d-flex justify-content-between align-items-center mb-2 card-price-title">
                                            <span>
                                                Total Transaksi
                                            </span>
                                            <span>
                                                { input.code }
                                            </span>
                                        </div>

                                        <div className="text-center price-total">
                                            <NumericFormat 
                                                value={ total_pembayaran } 
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
                                        <Accordion sx={{boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.274)'}}>
                                            <AccordionSummary
                                                expandIcon={ <ExpandMore /> }
                                            >
                                                <Typography>Tempo</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="mb-2">
                                                    <label className="form-label form-label-m-0">Pembayaran 1</label>
                                                    <div className="mb-1">
                                                        <DatePicker 
                                                            required={ input.tempo_1 !== '' || input.nominal_tempo_1 !== '' || input.tempo_2 !== '' || input.nominal_tempo_2 !== '' ? true : false}
                                                            slotProps={{ textField: { size: 'small' } }}
                                                            onChange={(e) => setInput({...input, tempo_1: `${e['$y']}-${e['$M'] + 1}-${e['$D']}`})}
                                                        />
                                                    </div>
                                                    <TextField
                                                        required={ input.tempo_1 !== '' || input.nominal_tempo_1 !== '' || input.tempo_2 !== '' || input.nominal_tempo_2 !== '' ? true : false}
                                                        fullWidth
                                                        size="small"
                                                        onChange={(e) => setInput({...input, nominal_tempo_1: e.target.value})}
                                                        placeholder="Rp. "
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom,
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-2">
                                                    <label className="form-label form-label-m-0">Pembayaran 2</label>
                                                    <div className="mb-1">
                                                        <DatePicker 
                                                            required={ input.tempo_1 !== '' || input.nominal_tempo_1 !== '' || input.tempo_2 !== '' || input.nominal_tempo_2 !== '' ? true : false}
                                                            slotProps={{ textField: { size: 'small' } }}
                                                            onChange={(e) => setInput({...input, tempo_2: `${e['$y']}-${e['$M'] + 1}-${e['$D']}`})}
                                                        />
                                                    </div>
                                                    <TextField
                                                        required={ input.tempo_1 !== '' || input.nominal_tempo_1 !== '' || input.tempo_2 !== '' || input.nominal_tempo_2 !== '' ? true : false}
                                                        fullWidth
                                                        size="small"
                                                        onChange={(e) => setInput({...input, nominal_tempo_2: e.target.value})}
                                                        placeholder="Rp. "
                                                        InputProps={{
                                                            inputComponent: NumericFormatCustom,
                                                        }}
                                                    />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>

                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Metode Pembayaran</label>
                                        <Select
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                            value={input.metode_pembayaran}
                                            onChange={(e) => setInput({...input, metode_pembayaran: e.target.value})}
                                            required
                                        >
                                            <MenuItem value="" disabled>Metode Pembayaran</MenuItem>
                                            <MenuItem value="cash">Cash</MenuItem>
                                            <MenuItem value="transfer">Transfer</MenuItem>
                                        </Select>
                                    </div>
                                    
                                    {
                                        input.metode_pembayaran === 'transfer' ? 
                                        biodataTransfer : ''
                                    }
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Nominal</label>
                                        <TextField
                                            error={ price.status_nominal ? true : false }
                                            fullWidth
                                            size="small"
                                            onChange={handleChangeNominalBayar}
                                            placeholder="Rp. "
                                            InputProps={{
                                                inputComponent: NumericFormatCustom,
                                            }}
                                        />
                                        <small className="text-danger">{ price.status_nominal ? `Nominal yang harus di bayar adalah ${price.nominal_bayar}` : '' }</small>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Bukti Transaksi</label>
                                        <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" onChange={handleChangeFile} />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Status Pengiriman</label>
                                        <Select
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                            value={input.status_pengiriman}
                                            onChange={(e) => setInput({...input, status_pengiriman: e.target.value})}
                                            required
                                        >
                                            <MenuItem value="" disabled>Status Pengiriman</MenuItem>
                                            <MenuItem value="dikirim">Dikirim</MenuItem>
                                            <MenuItem value="diambil">Diambil</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label form-label-m-0">Jadwal Pengiriman</label>
                                        <DatePicker 
                                            sx={{width: '100%'}}
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(e) => setInput({...input, jadwal_pengiriman: `${e['$y']}-${e['$M'] + 1}-${e['$D']}`})}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2">
                                            <Button type="submit" sx={{backgroundColor: '#2fb344'}} fullWidth variant="contained" color="primary">
                                                Bayar
                                            </Button>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-4 mb-1">
                                                <Button sx={{backgroundColor: '#c90785'}} fullWidth variant="contained" color="primary">
                                                    Void
                                                </Button>
                                            </div>
                                            <div className="col-md-4 mb-1">
                                                <Button fullWidth variant="contained" color="error">
                                                    Cancel
                                                </Button>
                                            </div>
                                            <div className="col-md-4 mb-1">
                                                <Button type="submit" fullWidth variant="contained" color="primary">
                                                    Cetak
                                                </Button>
                                            </div>
                                        </div>
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

export default PurchaseForm
