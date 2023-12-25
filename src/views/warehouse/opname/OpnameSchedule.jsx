import React, { useState } from 'react'

import Warehouse from '../Warehouse'
import { ReplyAll } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Autocomplete, Button, Checkbox, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { getSearchCategoryByCodeName } from '../../../models/product/product_category_m'
import { getProductByCategory } from '../../../models/product/product_m'
import { storeOpname } from '../../../models/opname/opname_m'
import toast from 'react-hot-toast'

import Loading from '../../loading/Loading'

const OpnameSchedule = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { username } = useParams();
 
    const handleOpname = () => {
        return navigate(-1)
    }

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const time = `${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;

    const [input, setInput] = useState({
        code: `OPNM${day}${month}${year}${time}`, tgl_opname: '', month_year: '',
    })
    const [opnameLists, setOpnameLists] = useState([]);

    // array data
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([])

    // get data
    const getDataCategory = async(code_name_search) => 
    {
        try {
            const response = await dispatch(getSearchCategoryByCodeName(code_name_search)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })));
        } catch (error) {
            
        }
    }

    const getByCategory = async(code_category) => {
        try {
            const response = await dispatch(getProductByCategory(code_category)).unwrap().catch((err) => {});
            setProduct(response.data)
        } catch (error) {
            
        }
    }

    const handleSearchCategory = (e) => {
        if (e.target.value !== '') {
            return getDataCategory(e.target.value)
        } else {
            setCategory([])
        }
    }

    const handleChangeCategory = (_, event) => {
        return getByCategory(event.code);
    }

    // handle change list product opname
    const handleChangeListOpname = (e, index, code_product, code_category, code_merk, product, category, merk, qty) => {
        if (e.target.checked === true) {
            setOpnameLists([
                ...opnameLists,
                {
                    code_product: code_product,
                    code_category: code_category,
                    code_merk: code_merk,
                    product: product,
                    category: category,
                    merk:  merk,
                    qty: qty
                }
            ])
        } else {
            const newLists = Array.from(opnameLists);
            newLists.splice(index, 1);
            setOpnameLists(newLists)
        }
    }

    // submit
    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            ...input,
            opname_lists: {...opnameLists}
        }

        try {
            const response = await dispatch(storeOpname(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                    return window.location.href = `/${username}/warehouse/opname` 
                }, 1000);
            } 

            if (response.status === 400) {
                setLoading(false);
                toast.error('Periksa kembali data Anda');
                setError(response.message)
                setTimeout(() => {
                    setError([]);
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
                                <h3>TAMBAH JADWAL OPNAME</h3>
                                <span>Tambah Jadwal Opname</span>
                            </div>
                            <div onClick={handleOpname} className="text-center me-3" style={{cursor: 'pointer'}}>
                                <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem', borderRadius: '100%'}}>
                                    <ReplyAll sx={{width: '1.25rem', height: '1.25rem'}} />
                                </span>
                                <span style={{fontSize: '12px'}} className="d-block">Kembali</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-12 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row align-items-center mb-3">
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label-form-label-m-0">Kode Opname</label>
                                            <TextField 
                                                size="small"
                                                fullWidth
                                                value={input.code}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label form-label-m-0">Tanggal Opname</label>
                                            <DatePicker 
                                                sx={{width: '100%'}}
                                                slotProps={{textField: {size: 'small'}}}
                                                onChange={(e) => setInput({...input, tgl_opname: `${e['$y']}-${e['$M'] + 1}-${e['$D']}`, month_year: `${e['$y']}-${e['$M']}`})}
                                            />
                                            <small className="text-danger">{ error.tgl_opname ? error.tgl_opname: '' }</small>
                                        </div>
                                        <div className="col-md-3 mb-3">
                                            <label className="form-label" style={{marginBottom: 0}}>Kategori Produk</label>
                                            <Autocomplete 
                                                size="small"
                                                fullWidth
                                                options={category}
                                                disableClearable
                                                renderInput={(params) => <TextField {...params} placeholder="Kategori" onChange={handleSearchCategory} required />}   
                                                onChange={handleChangeCategory} 
                                                required
                                            />
                                        </div>

                                        <div className="col-md-12">
                                            <div className="table-responsive">
                                                <table className="table align-middle">
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
                                                                <span className="form-control">Merk</span>
                                                            </th>
                                                            <th style={{width: '8%'}} className="table-border-end text-center">
                                                                <span className="form-control">Pilih</span>
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                        {
                                                            product.map((data, index) => (
                                                                <tr key={data.no}>
                                                                    <td className="text-center">{ data.no }</td>
                                                                    <td>{ data.code }</td>
                                                                    <td>{ data.name }</td>
                                                                    <td>{ data.category }</td>
                                                                    <td>{ data.merk }</td>
                                                                    <td className="text-center">
                                                                        <Checkbox onChange={(e) => handleChangeListOpname(e, index, data.code, data.code_category, data.code_merk, data.name, data.category, data.merk, data.stock)} />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-end">
                                        <Button variant="contained" color="primary" type="submit">
                                            Ajukan Jadwal
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

export default OpnameSchedule
