import React, { useState } from 'react'

import MasterProductDetailSubCategory from '../MasterProductDetailSubCategory'
import { useDispatch } from 'react-redux'
import { Autocomplete, Button, TextField } from '@mui/material';
import { getSearchCategoryByCodeName } from '../../../../../models/product/product_category_m';
import { getSearchProductSubCategoryByCategoryCodeName } from '../../../../../models/product/product_sub_category_m';
import { storeProductSubCategoryDetail } from '../../../../../models/product/product_sub_category_detail_m';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import Loading from '../../../../loading/Loading';

const MasterProductDetailSubCategoryForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const [input, setInput] = useState({
        code: '', code_category: '', code_sub_category: '', category: '', sub_category: '', name: ''
    })
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([]);

    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])

    const getSearchDataCategory = async(code_name_search) => 
    {
        try {
            const response = await dispatch(getSearchCategoryByCodeName(code_name_search)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    const getSearchDataSubCategory = async(code_name_search) => 
    {
        const data = {
            code_category: input.code_category,
            code_name_search: code_name_search
        }
        try {
            const response = await dispatch(getSearchProductSubCategoryByCategoryCodeName(data)).unwrap().catch((err) => {});
            setSubCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }

    // handle search
    const handleSearcCategory = (e) => 
    {
        if (e.target.value !== '') {
            return getSearchDataCategory(e.target.value)
        } else {
            setCategory([]);
        }
    }

    const handleSearcSubCategory = (e) => 
    {
        if (e.target.value !== '') {
            return getSearchDataSubCategory(e.target.value)
        } else {
            setSubCategory([]);
        }
    }

    // handle change
    const handleChangeCategory = (_, event) => 
    {
        if (event) {
            setInput({
                ...input, code_category: event.code, category: event.name
            })
        } else {
            setInput({
                ...input, code_category: '', category: ''
            })
        }
    }

    const handleChangeSubCategory = (_, event) =>
    {
        setInput({...input, code_sub_category: event.code, sub_category: event.name})
    }

    // submit 
    const onSubmit = async(e) => 
    {
        e.preventDefault();
        setLoading(true)
        const data = {...input}

        try {
            const response = await dispatch(storeProductSubCategoryDetail(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                setLoading(false);
                toast.error('Periksa kembali data Anda')
                setError(response.message);
                setTimeout(() => {
                   setError([]); 
                }, 1500);
            }

            if (response.status === 201) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                   return window.location.href = `/${username}/product/master/detail-sub-category/data` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

    return (
        <MasterProductDetailSubCategory>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Detail Sub Kategori</label>
                                        <TextField 
                                            error={ error.code ? true: false }
                                            size="small"
                                            fullWidth
                                            placeholder="Kode Detail Sub Kategori"
                                            required
                                            onChange={(e) => setInput({...input, code: e.target.value})}
                                        />
                                        <small className="text-danger">{error.code ? error.code : ''}</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Kategori</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            options={category}
                                            renderInput={ (params) => <TextField {...params} onChange={handleSearcCategory} placeholder="Kategori" required /> }
                                            onChange={handleChangeCategory}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Sub Kategori</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            options={subCategory}
                                            renderInput={ (params) => <TextField {...params} required placeholder="Sub Kategori" onChange={handleSearcSubCategory} /> }
                                            onChange={handleChangeSubCategory}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nama Detail Sub Kategori</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            placeholder="Nama Detail Sub Kategori"
                                            required
                                            onChange={(e) => setInput({...input, name: e.target.value})}
                                        />
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
        </MasterProductDetailSubCategory>
    )
}

export default MasterProductDetailSubCategoryForm
