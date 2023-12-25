import React, { useState } from 'react'
import MatserProductCategory from '../MatserProductCategory'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { storeProductCategory } from '../../../../../models/product/product_category_m'
import toast, { Toaster } from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import Loading from '../../../../loading/Loading'

const MasterProductCategoryForm = () => {
    const dispacth = useDispatch();

    const { username } = useParams();

    const [error, setError] = useState([]);
    const [loading, setLoading] = useState(false);

    const { register, handleSubmit } = useForm();

    const onSubmit = async(data) => {
        setLoading(true);
        try {
            const response = await dispacth(storeProductCategory(data)).unwrap().catch((err) => {});
            if (response) {
                setLoading(false);
                if (response.status === 400) {
                    toast.error('Periksa data Anda');
                    setError(response.message);
                    setTimeout(() => {
                       window.location.reload(); 
                    }, 1000);
                }

                if (response.status === 201) {
                    toast.success('Data berhasil disimpan');
                    setTimeout(() => {
                        return window.location.href = `/${username}/product/master/category/data`
                    }, 1200);
                }
            }
        } catch (error) {
            
        }
    }

    return (
        <MatserProductCategory>
            <Toaster position="top-right" />
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode</label>
                                        <input type="text" className="form-control" placeholder="Tulis Kode Kategori" {...register('code')} required />
                                        <small className="text-danger">{ error.code ? error.code : '' }</small>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nama Kategori</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nama Kategori" {...register('name')} required />
                                    </div>
                                    <div className="d-flex justfify-content-end">
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
        </MatserProductCategory>
    )
}

export default MasterProductCategoryForm
