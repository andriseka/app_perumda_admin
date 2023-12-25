import React, { useEffect, useState } from 'react'
import Sales from '../../Sales'
import { ExpandMore, PendingActions, ShoppingBag, TableView } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Button, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { getSearchMarketingByCodeName } from '../../../../models/marketing/marketing_m'
import { useDispatch } from 'react-redux'
import { getSearchCategoryByCodeName } from '../../../../models/product/product_category_m'
import { getSearchProductMerkByCategoryCodeName } from '../../../../models/product/product_merk_m'
import { getProductByMerkCodeNameSearch } from '../../../../models/product/product_m'

import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';

import { noimage } from '../../../images'
import toast from 'react-hot-toast'
import { DatePicker } from '@mui/x-date-pickers'
import SalesCart from './SalesCart'

import { imageResizer } from '../../../../utils'
import { storeSalesMarketing } from '../../../../models/sales/marketing/sales_marketing_m'

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

const SalesForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();
    const navigate = useNavigate();

    const clickData = () => {
        return navigate(`/${username}/sales/data`)
    }

    const clickVoid = () => {

    }


    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
    const waktu = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    const date_now = date.toLocaleString() + '';

    const [marketing, setMarketing] = useState([]);
    const [category, setCategory] = useState([]);
    const [merk, setMerk] = useState([]);
    const [product, setProduct] = useState([]);

    const [input, setInput] = useState({
        code: `TR${day}${month}${year}${time}`, tgl_transaksi: `${year}-${month}-${day}`, wkt_transaksi: waktu, petugas: 'Andris Eka',
        code_marketing: '', marketing: '', tgl_pengambilan: '', tgl_penyetoran: '', nominal_bayar: '',
        month:`${month}`, year: `${year}`, metode_pembayaran: '', file: ''
    })

    const [search, setSearch] = useState({
        code_category: '', code_merk: '', category: '', merk: '', name: ''
    })

    const [lists, setLists] = useState([]);

    const [settingPrice, setSettingPrice] = useState('harga_1');

    const [loading, setLoading] = useState(false);

    const getDataMarketing = async(code_name_search) => {
        try {
            const response = await dispatch(getSearchMarketingByCodeName(code_name_search)).unwrap().catch((err) => {});
            setMarketing(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })));
        } catch (error) {
            
        }
    }

    const getDataCategoryProduct = async(code_name_search) => {
        try {
            const response = await dispatch(getSearchCategoryByCodeName(code_name_search)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    const getDataMerk = async(data) => {
        try {
            const response = await dispatch(getSearchProductMerkByCategoryCodeName(data)).unwrap().catch((err) => {});
            setMerk(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    const getDataProduct = async(data) => {
        try {
            const response = await dispatch( getProductByMerkCodeNameSearch(data)).unwrap().catch((err) => {});
            setProduct(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataMarketing('-')
        getDataCategoryProduct('-');
    }, [])


    // handle search
    const handleSearchMarketing = (e) => {
        if (e.target.value !== '') {
            return getDataMarketing(e.target.value)
        } else {
            setInput({
                ...input,
                code_marketing: '',
                marketing: ''
            })
        }
    }

    const handleSearchCategory = (e) => {
        if (e.target.value !== '') {
            return getDataCategoryProduct(e.target.value);
        } else {
            setMerk([]);
        }
    }

    const handleSearchMerk = (e) => {
        if (e.target.value !== '') {
            const data = {
                code_category: search.code_category,
                code_name_search: e.target.value
            }
            return getDataMerk(data)
        }
    }

    const handleSearchProduct = async(e) => {
        e.preventDefault();
        if (search.name === '') {
            search.name = '-';
        } else {
            search.name = search.name
        }

        const data = {
            code_merk: search.code_merk,
            code_name_search: search.name
        };

        return getDataProduct(data);   
    }   


     // handle change
    const handleChangeMarketing = (_, event) => {
        if (event) {
            setInput({
                ...input,
                code_marketing: event.code,
                marketing: event.name
            })
        }
    }

    const handleChangeCategory = (_, event) => {
        if (event) {
            setSearch({...search, code_category: event.code, category:event.name})
            const data = {
                code_category: event.code,
                code_name_search: '-'
            }
            getDataMerk(data)
        }
    }

    const handleChangeMerk = (_, event) => {
        if (event) {
            setSearch({...search, code_merk: event.code, merk: event.name})
        }
    }

    const handleChangeFile = async(e) => {
        const file= e.target.files[0];
        const resizer = await imageResizer(file, 240, 240);
        setInput({...input, file: resizer})
    }

    // array add
    let sub_total_pembayaran;
    if (settingPrice === 'harga_1') {
        sub_total_pembayaran = lists.reduce((i, j) => i + (j.qty * j.harga_1), 0)
    } else if (settingPrice === 'harga_2') {
        sub_total_pembayaran = lists.reduce((i, j) => i + (j.qty * j.harga_2), 0)
    } else if (settingPrice === 'harga_3') {
        sub_total_pembayaran = lists.reduce((i, j) => i + (j.qty * j.harga_3), 0)
    } else if(settingPrice === 'harga_4') {
        sub_total_pembayaran = lists.reduce((i, j) => i + (j.qty * j.harga_4), 0)
    }

    const onAdd = (code_product) => {
        const checkLists = lists.some(element => {
            if (element.code === code_product) {
                return true;
            }
            return false;
        });

        if (checkLists === true) {
            toast.error('Produk sudah masuk ke keranjang')
        } else {
            toast.success('Produk berhasil dimasukkan keranjang')
            product.some(obj => {
                if (obj.code === code_product) {
                    setLists([
                        ...lists,
                        {
                            code: obj.code,
                            code_category: obj.code_category,
                            code_merk: obj.code_merk,
                            category: obj.category,
                            merk: obj.merk,
                            name: obj.name,
                            harga_1: obj.harga_1,
                            harga_2: obj.harga_2,
                            harga_3: obj.harga_3,
                            harga_4: obj.harga_4,
                            qty: 1
                        }
                    ])  
                }
            })
        }
    }

    const onCancelCart = (index) => {
        const neswList = Array.from(lists);
        neswList.splice(index, 1);
        setLists(neswList)
    }

    // chart
    const [open, setOpen] = useState(false)
    const handleModalChartOpen = () => {
        setOpen(true)
    }
    const handleModalChartClose = () => {
        setOpen(false)
    }
    const onUpdateQty = (e, code) => {
        const newLists = lists.map(obj => {
            if (obj.code === code) {
                return {...obj, qty: e.target.value}
            }
            return obj
        })
        setLists(newLists)
    }

    // ppn
    const [ppn, setPpn] = useState('non');

    const handleChangePpn = (e) => {
        setPpn(e.target.value)
    }

    let total_pembayaran;
    let ppn_price;
    if (ppn === 'ppn') {
        ppn_price = (11 / 100) * sub_total_pembayaran;
        total_pembayaran = sub_total_pembayaran + ppn_price;
    } else {
        ppn_price = 0;
        total_pembayaran = sub_total_pembayaran;
    }

    const onSubmit = async(e) => {
        e.preventDefault();

        if (input.nominal_bayar !== '') {
            input.nominal_bayar = input.nominal_bayar;
        } else {
            input.nominal_bayar = 0;
        }

        if (input.metode_pembayaran !== '') {
            input.metode_pembayaran = input.metode_pembayaran;
        } else {
            input.metode_pembayaran = null;
        }

        const data = {
            ...input,
            status_ppn: ppn,
            ppn : ppn_price,
            total_pembayaran: total_pembayaran,
            status_harga: settingPrice,
            sales_lists : {...lists}
        }

        try {
            const response = await dispatch(storeSalesMarketing(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                toast.success('Transaksi Berhasil')
                setTimeout(() => {
                   return window.location.href = `/${username}/sales/data` 
                }, 1200);
            } else {
                toast.error('Periksa kembali data Anda');
            }
        } catch (error) {
            
        }

    }

    return (
        <Sales>
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{ lineHeight: '60%' }}>
                                <h3>KASIR PENJUALAN</h3>
                                <span>Transaksi Penjualan</span>
                            </div>

                            <div className="d-flex">
                                <div onClick={clickData} className="text-center me-2" style={{ cursor: 'pointer' }}>
                                    <span className="btn btn-icon btn-primary" style={{ padding: '.4rem .4rem' }}>
                                        <TableView sx={{ width: '1.25rem', height: '1.25rem' }} />
                                    </span>
                                    <span style={{ fontSize: '12px' }} className="d-block">Data</span>
                                </div>

                                <div onClick={clickVoid} className="text-center me-2" style={{ cursor: 'pointer' }}>
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
                <div className="row">
                    <div className="col-md-9 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <form onSubmit={handleSearchProduct} method="GET" className="mb-3">
                                    <div className="card-in mb-2">
                                        <div className="row">
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Kode Transaksi</label>
                                                <TextField 
                                                    sx={{'.Mui-disabled': { backgroundColor: '#00000012' }}}
                                                    size="small"
                                                    value={input.code}
                                                    fullWidth
                                                    placeholder="Auto"
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Tanggal Transaksi</label>
                                                <TextField 
                                                    sx={{'.Mui-disabled': { backgroundColor: '#00000012' }}}
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Auto"
                                                    value={date_now}
                                                    disabled
                                                />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Petugas</label>
                                                <TextField 
                                                    sx={{'.Mui-disabled': { backgroundColor: '#00000012' }}}
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Auto"
                                                    value={input.petugas}
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card-in">
                                        <div className="row align-items-end">
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Marketing</label>
                                                <Autocomplete 
                                                    size="small"
                                                    fullWidth
                                                    value={input.marketing}
                                                    options={marketing}
                                                    disableClearable
                                                    isOptionEqualToValue={(option) => option.label}
                                                    renderInput={(params) => <TextField {...params} placeholder="Referal dari Marketing" onChange={handleSearchMarketing} required />}
                                                    onChange={handleChangeMarketing}
                                                    disabled={input.marketing ? true : false}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Kategori Produk</label>
                                                <Autocomplete 
                                                    size="small"
                                                    fullWidth
                                                    value={search.category}
                                                    options={category}
                                                    isOptionEqualToValue={(option) => option.label}
                                                    disableClearable
                                                    renderInput={(params) => <TextField {...params} placeholder="Kategori Produk" onChange={handleSearchCategory} required />}
                                                    onChange={handleChangeCategory}
                                                />
                                            </div>
                                            <div className="col-md-4 mb-2">
                                                <label className="form-label form-label-m-0">Kategori Produk</label>
                                                <Autocomplete 
                                                    size="small"
                                                    fullWidth
                                                    value={search.merk}
                                                    options={merk}
                                                    isOptionEqualToValue={(option) => option.label}
                                                    disableClearable
                                                    renderInput={(params) => <TextField {...params} placeholder="Merk Produk" onChange={handleSearchMerk} required />}
                                                    onChange={handleChangeMerk}
                                                />
                                            </div>

                                            <div className="col-md-10 mb-2">
                                                <label className="form-label form-label-m-0">Cari Produk</label>
                                                <TextField 
                                                    size="small"
                                                    fullWidth
                                                    placeholder="Cari Produk"
                                                    onChange={(e) => setSearch({...search, name: e.target.value})}
                                                />
                                            </div>
                                            <div className="col-md-2 mb-2">
                                                <Button type="submit" sx={{padding: '8.5px 14px'}} variant="contained" color="primary" fullWidth>
                                                    Cari
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
                                <div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h3>LIST PRODUK</h3>
                                        </div>
                                        <div>
                                            <select className="form-select" onChange={(e) => setSettingPrice(e.target.value)}>
                                                <option value="harga_1">Harga 1</option>
                                                <option value="harga_2">Harga 2</option>
                                                <option value="harga_3">Harga 3</option>
                                                <option value="harga_4">Harga 4</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* list produk */}
                                <div className="row">
                                    {
                                        product.filter(obj => obj.harga_1 !== 0 && obj.stock !== 0).map((data, index) => (
                                            <div key={index} className="col-md-3 mb-2">
                                                <div className="card">
                                                    <img src={ data.image ? data.image : noimage } alt="" style={{width: '100%', height: '140px', borderTopLeftRadius: '4px', borderTopRightRadius: '4px'}} />
                                                    <div className="card-body">
                                                        <div className="text-center">
                                                            <h4>{data.name}</h4>
                                                            <h3 className="text-green">
                                                                <NumericFormat 
                                                                    value={ settingPrice === 'harga_1' ? data.harga_1 : settingPrice === 'harga_2' ? data.harga_2 : settingPrice === 'harga_3' ? data.harga_3 : settingPrice === 'harga_4' ? data.harga_4 : data.harga_1 } 
                                                                    allowLeadingZeros 
                                                                    thousandSeparator="," 
                                                                    valueIsNumericString
                                                                    prefix="Rp. "
                                                                    displayType="text"
                                                                    renderText={(value) => <span>{value}</span>}
                                                                />
                                                            </h3>
                                                            <div>
                                                                <Button onClick={() => onAdd(data.code)} variant="contained" size="small">
                                                                    Masukkan keranjang
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3 mb-3">
                        <form onSubmit={onSubmit}>
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
                                    <div className="card-in mb-2">
                                        <div onClick={handleModalChartOpen} style={{cursor: 'pointer'}} className="d-flex justify-content-between align-items-center">
                                            <div>
                                                Lihat Keranjang
                                            </div>
                                            <div>
                                                <ShoppingBag />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <Accordion sx={{boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.274)'}}>
                                            <AccordionSummary
                                                expandIcon={ <ExpandMore /> }
                                            >
                                                <Typography>Penyetoran</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="mb-2">
                                                    <label className="form-label form-label-m-0">Tanggal Penyetoran</label>
                                                    <div className="mb-1">
                                                        <DatePicker 
                                                            slotProps={{ textField: { size: 'small' } }}
                                                            onChange={(e) => setInput({...input, tgl_penyetoran: `${e['$y']}-${e['$M'] + 1}-${e['$D']}`})}
                                                            fullWidth
                                                        />
                                                    </div>
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
                                        >
                                            <MenuItem value="" disabled>Metode Pembayaran</MenuItem>
                                            <MenuItem value="cash">Cash</MenuItem>
                                            <MenuItem value="transfer">Transfer</MenuItem>
                                        </Select>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Nominal</label>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="Rp. "
                                            onChange={(e) => setInput({...input, nominal_bayar: e.target.value})}
                                            InputProps={{
                                                inputComponent: NumericFormatCustom,
                                            }}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label form-label-m-0">Tanggal Pengambilan</label>
                                        <DatePicker 
                                            sx={{width: '100%'}}
                                            slotProps={{ textField: { size: 'small' } }}
                                            onChange={(e) => setInput({...input, tgl_pengambilan: `${e['$y']}-${e['$M'] + 1}-${e['$D']}`})}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Bukti Transaksi</label>
                                        <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" onChange={handleChangeFile} />
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
                        </form>
                    </div>
                </div>
            </div>

            { 
                open ? 
                <SalesCart 
                    open={open} 
                    onClose={handleModalChartClose} 
                    lists={lists} 
                    setting_price={settingPrice} 
                    onUpdateQty={onUpdateQty} 
                    handleChangePpn={handleChangePpn}
                    ppn={ppn}
                    ppn_price={ppn_price}
                    total_pembayaran={total_pembayaran}
                    onCancelCart={onCancelCart}
                /> : '' 
            }
        </Sales>
    )
}

export default SalesForm
