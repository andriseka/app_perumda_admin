import React, { useState } from 'react'
import MasterProductSubCategory from '../MasterProductSubCategory'
import { useDispatch } from 'react-redux'
import { getSearchCategoryByCodeName } from '../../../../../models/product/product_category_m';
import { Autocomplete, Button, TextField } from '@mui/material';
import { storeProductSubCategory } from '../../../../../models/product/product_sub_category_m';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Loading from '../../../../loading/Loading'

const MasterProductSubCategoryForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    // input
    const [input, setInput] = useState({
        code: '', code_category: '', category: '', name: ''
    })

    // get data category
    const getSearchCategory = async(code_name_search) => {
        try {
            const response = await dispatch(getSearchCategoryByCodeName(code_name_search)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, label: i.code + ' - ' + i.name, name: i.name })));
        } catch (error) {
            
        }
    }

    // handle
    const handleSearchCategory = (e) => {
        if (e.target.value !== '') {
            return getSearchCategory(e.target.value)
        } else {
            setCategory([]);
        }
    }

    const handleCategory = (_, event) => {
        setInput({
            ...input,
            code_category: event.code,
            category: event.name
        })
    }
    // submit
    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        const data = {...input}

        try {
            const response = await dispatch(storeProductSubCategory(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                setLoading(false)
                setError(response.message)
                toast.error('Periksa kembali data Anda');
                setTimeout(() => {
                   setError([]);
                }, 1500);
            }

            if (response.status === 201) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                   return window.location.href = `/${username}/product/master/sub-category/data` 
                }, 1000);
            }
        } catch (error) {
            
        }
    }

    return (
        <MasterProductSubCategory>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Sub Kategori</label>
                                        <TextField 
                                            error={error.code ? true: false}
                                            size="small"
                                            fullWidth
                                            placeholder="Kode Sub Kategori"
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
                                            renderInput={(params) => <TextField {...params} onChange={handleSearchCategory} placeholder="Cari Kategori" required /> }
                                            onChange={handleCategory}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Nama Sub Kategori</label>
                                        <TextField 
                                            error={error.name ? true: false}
                                            size="small"
                                            fullWidth
                                            placeholder="Nama Sub Kategori"
                                            required
                                            onChange={(e) => setInput({...input, name: e.target.value})}
                                        />
                                         <small className="text-danger">{error.name ? error.name : ''}</small>
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
        </MasterProductSubCategory>
    )
}

export default MasterProductSubCategoryForm
