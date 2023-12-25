import React, { useState } from 'react'

import Product from '../Product'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Autocomplete, Button, TextField } from '@mui/material';
import { getSearchCategoryByCodeName } from '../../../models/product/product_category_m';
import { getSearchProductSubCategoryByCategoryCodeName } from '../../../models/product/product_sub_category_m';
import { getSearchProductSubCategoryDetailBySubCategoryCodeName } from '../../../models/product/product_sub_category_detail_m';
import { getSearchProductMerkByCategoryCodeName } from '../../../models/product/product_merk_m';

// utils
import { imageResizer } from '../../../utils'
import { storeProduct } from '../../../models/product/product_m';
import toast from 'react-hot-toast';

import Loading from '../../loading/Loading'

const ProductForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [detailSubCategory, setDetailSubCategory] = useState([]);
    const [merk, setMerk] = useState([]);

    const [input, setInput] = useState({
        code: '', code_category: '', code_sub_category: '', code_sub_category_detail: '', code_merk: '',
        category: '', sub_category: '', sub_category_detail: '', merk: '', name: '', unit: '',
        stock_min: '', desc: '', info: '', image: ''
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([]);

    // get data
    const getSearchDataCategory = async(code_name_search) =>
    {
        try {
            const response = await dispatch(getSearchCategoryByCodeName(code_name_search)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    const getSearchDataSubCategory = async(data) => 
    {
        try {
            const response = await dispatch(getSearchProductSubCategoryByCategoryCodeName(data)).unwrap().catch((err) => {});
            setSubCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    const getSearchDataSubCategoryDetail = async(data) => 
    {
        try {
            const response = await dispatch(getSearchProductSubCategoryDetailBySubCategoryCodeName(data)).unwrap().catch((err) => {});
            setDetailSubCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    const getSearchDataMerk = async(data) => 
    {
        try {
            const response = await dispatch(getSearchProductMerkByCategoryCodeName(data)).unwrap().catch((err) => {});
            setMerk(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    // handle search
    const handleSearchCategory = (e) => 
    {
        if (e.target.value !== '') {
            return getSearchDataCategory(e.target.value)
        } else {
            setCategory([])
        }
    }   

    const handleSearchSubCategory = (e) => 
    {
        if (e.target.value !== '') {
            const data = {
                code_category: input.code_category,
                code_name_search: e.target.value
            }
            return getSearchDataSubCategory(data)
        } else {
            setCategory([])
        }
    }

    const handleSearchSubCategoryDetail = (e) => 
    {
        if (e.target.value !== '') {
            const data = {
                code_sub_category: input.code_sub_category,
                code_name_search: e.target.value
            }
            return getSearchDataSubCategoryDetail(data)
        } else {
            setCategory([])
        }
    }

    const handleSearchMerk = (e) => 
    {
        if (e.target.value !== '') {
            const data = {
                code_category: input.code_category,
                code_name_search: e.target.value
            }
            return getSearchDataMerk(data)
        } else {
            setMerk([])
        }
    }

    // handle change
    const handleChangeCategory = (_, event) => 
    {
        setInput({
            ...input,
            code_category: event.code,
            category: event.name,
            code_sub_category: '',
            sub_category: '',
            code_sub_category_detail: '',
            sub_category_detail: '',
            code_merk: '',
            merk: ''
            
        })
        setSubCategory([])
        setDetailSubCategory([]);
        setMerk([])
    }

    const handleChangeSubCategory = (_, event) => 
    {
        setInput({
            ...input,
            code_sub_category: event.code,
            sub_category: event.name,
            code_sub_category_detail: '',
            sub_category_detail: ''
        })
        setDetailSubCategory([]);
    }

    const handleChangeSubCategoryDetail = (_, event) => 
    {
        setInput({
            ...input,
            code_sub_category_detail: event.code,
            sub_category_detail: event.name
        })
    }

    const handleChangeMerk = (_, event) => 
    {
        setInput({
            ...input,
            code_merk: event.code,
            merk: event.name
        })
    }

    const handleChangeImage = async(e) => {
        const file = e.target.files[0];
        const resize = await imageResizer(file, 240, 240);

        setInput({
            ...input, image: resize
        })
    }

    // submit
    const onSubmit = async(e) => {
        e.preventDefault();

        setLoading(true);
        const data = {...input}

        try {
            const response = await dispatch(storeProduct(data)).unwrap().catch((err) => {});
            if (response.status == 400) {
                setLoading(false);
                setError(response.message);
                toast.error('Periksa kembali data Anda')
                setTimeout(() => {
                   setError([]); 
                }, 1500);
            }

            if (response.status === 201) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                   return window.location.href = `/${username}/product/data` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }
    
    return (
        <Product>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Produk</label>
                                        <TextField 
                                            error={ error.code ? true: false }
                                            size="small"
                                            fullWidth
                                            placeholder="Kode Produk"
                                            required
                                            onChange={(e) => setInput({...input, code: e.target.value})}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Kategori</label>
                                            <Autocomplete 
                                                disableClearable
                                                size="small"
                                                fullWidth
                                                options={category}
                                                isOptionEqualToValue={(option) => option.label}
                                                renderInput={(params) => <TextField {...params} placeholder="Kategori" required onChange={handleSearchCategory} />}
                                                onChange={handleChangeCategory}
                                            />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Sub Kategori</label>
                                            <Autocomplete 
                                                disableClearable
                                                size="small"
                                                fullWidth
                                                value={input.sub_category}
                                                options={subCategory}
                                                isOptionEqualToValue={(option) => option.label}
                                                renderInput={(params) => <TextField {...params} placeholder="Sub Kategori" required onChange={handleSearchSubCategory} />}
                                                onChange={handleChangeSubCategory}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Detail Sub Kategori</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            disableClearable
                                            value={input.sub_category_detail}
                                            options={detailSubCategory}
                                            renderInput={(params) => <TextField {...params} placeholder="Detail Sub Kategori" onChange={handleSearchSubCategoryDetail} />}
                                            onChange={handleChangeSubCategoryDetail}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="from-label">Merk</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            options={merk}
                                            value={input.merk}
                                            disableClearable
                                            renderInput={(params) => <TextField {...params} placeholder="Merk" required onChange={handleSearchMerk} />}
                                            onChange={handleChangeMerk}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nama Produk</label>
                                        <TextField 
                                            error={ error.name ? true : false }
                                            size="small"
                                            fullWidth
                                            placeholder="Nama Produk"
                                            required
                                            onChange={(e) => setInput({...input, name: e.target.value})}
                                        />
                                        <small className="text-danger">{error.name ? error.name : ''}</small>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Unit / Satuan</label>
                                            <TextField 
                                                error={ error.unit ? true: false }
                                                size="small"
                                                fullWidth
                                                placeholder="Unit / Satuan"
                                                required
                                                onChange={(e) => setInput({...input, unit: e.target.value})}
                                            />
                                            <small className="text-danger">{error.unit ? error.unit : ''}</small>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Minimal Stok</label>
                                            <TextField 
                                                error={ error.stock_min ? true: false }
                                                size="small"
                                                fullWidth
                                                type="number"
                                                placeholder="Minimal Stok"
                                                required
                                                onChange={(e) => setInput({...input, stock_min: e.target.value})}
                                            />
                                            <small className="text-danger">{error.stock_min ? error.stock_min : ''}</small>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label">Deskripsi</label>
                                        <textarea className="form-control" placeholder="Deskripsi" style={{height: '133px'}} onChange={(e) => setInput({...input, desc: e.target.value})}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Keterangan</label>
                                        <textarea className="form-control" placeholder="Keterangan" style={{height: '166px'}} onChange={(e) => setInput({...input, info: e.target.value})}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Gambar</label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control" onChange={handleChangeImage} />
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="contained" color="primary" type="submit">
                                            Simpan Data
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </Product>
    )
}

export default ProductForm
