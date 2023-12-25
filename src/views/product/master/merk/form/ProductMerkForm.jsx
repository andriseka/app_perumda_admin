import React, { useState } from 'react'

import ProductMerk from '../ProductMerk'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSearchCategoryByCodeName } from '../../../../../models/product/product_category_m'
import { storeProductMerk } from '../../../../../models/product/product_merk_m'
import toast from 'react-hot-toast'

import Loading from '../../../../loading/Loading'

const ProductMerkForm = () => {
    const dispatch = useDispatch();

    const { username } = useParams();

    const [category, setCategory] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const getSearchDataCategory = async(code_name_search) => 
    {
        try {
            const response = await dispatch(getSearchCategoryByCodeName(code_name_search)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })))
        } catch (error) {
            
        }
    }


    const [input, setInput] = useState({
        code: '', code_category: '', category: '', name: ''
    })

    // handle search
    const handleSearchCategory = (e) => 
    {
        if (e.target.value !== '') {
            return getSearchDataCategory(e.target.value)
        } else {
            setCategory([]);
        }
    }

    // handle change
    const handleChangeCategory = (_, event) =>
    {
        setInput({...input, code_category: event.code, category: event.name})
    }

    // submit
    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        const data = {...input}

        try {
            const response = await dispatch(storeProductMerk(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                setError(response.message);
                toast.error('Periksa kembali data Anda')
                setLoading(false);
                setTimeout(() => {
                   setError([]); 
                }, 1500);
            }

            if (response.status === 201) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                   return window.location.href = `/${username}/product/master/merk/data` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

    return (
        <ProductMerk>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Merk</label>
                                        <TextField 
                                            error={ error.code ? true: false }
                                            size="small"
                                            fullWidth
                                            placeholder="Kode Merk"
                                            required
                                            onChange={(e) => setInput({...input, code: e.target.value})}
                                        />
                                        <smal className="text-danger">{ error.code ? error.code : '' }</smal>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Kategori</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            options={category}
                                            renderInput={(params) => <TextField {...params} placeholder="Kategori" required onChange={handleSearchCategory} />}
                                            onChange={handleChangeCategory}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Nama Merk</label>
                                        <TextField 
                                            error={ error.name ? true: false }
                                            size="small"
                                            fullWidth
                                            placeholder="Nama Merk"
                                            required
                                            onChange={(e) => setInput({...input, name: e.target.value})}
                                        />
                                        <smal className="text-danger">{ error.name ? error.name : '' }</smal>
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
        </ProductMerk>
    )
}

export default ProductMerkForm
