import React, { useEffect, useState } from 'react'
import Store from '../Store'
import { Autocomplete, Button, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getSearchMarketingByCodeName } from '../../../../models/marketing/marketing_m'
import { getStoreCategory } from '../../../../models/store/store_category_m'

import { imageResizer } from '../../../../utils'
import Loading from '../../../loading/Loading'
import { postStore } from '../../../../models/store/store_m'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

const StoreForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const [input, setInput] = useState({
        code: '', code_category: '', code_marketing: '', category: '', marketing: '',
        name: '', address: '', phone: '', long: '', lat: '', image: '', docs: '', desc: ''
    })

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const [marketing, setMarketing] = useState([]);
    const [category, setCategory] = useState([])

    const getDataMarketing = async(code_name_search) => {
        try {
            const response = await dispatch(getSearchMarketingByCodeName(code_name_search)).unwrap().catch((err) => {});
            setMarketing(response.data.map((i) => ({ code: i.code, name: i.name, label: i.code + ' - ' + i.name })));
        } catch (error) {
            
        }
    }

    const getDataStoreCategory = async(page) => {
        try {
            const response = await dispatch(getStoreCategory(page)).unwrap().catch((err) => {});
            setCategory(response.data.map((i) => ({ code: i.code, name: i.name, label: i.name })))
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataMarketing('-')
        getDataStoreCategory(1);
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
            setInput({
                ...input,
                code_category: event.code,
                category: event.name
            })
        }
    }

    const handleChangeImage = async(e) => {
        const file = e.target.files[0];
        const resizer = await imageResizer(file, 240, 240);
        setInput({...input, image: resizer})
    }

    // submit
    const onSubmit = async(e) => {
        e.preventDefault();
        setLoading(true)
        const data = { ...input }

        try {
            const response = await dispatch(postStore(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                toast.success('Data berhasil disimpan');
                setTimeout(() => {
                   return window.location.href = `/${username}/mitra/toko/data`
                }, 1200);
            }

            if (response.status === 400) {
                toast.error('Periksa kembali data Anda');
                setError(response.message);
                setTimeout(() => {
                    setError([]);
                }, 1500);
            }
        } catch (error) {
            
        }
    }

    return (
        <Store>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row row-deck">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Kode Mitra Toko</label>
                                        <TextField 
                                            error={error.code ? true : false}
                                            size="small"
                                            fullWidth
                                            placeholder="Kode Mitra Toko"
                                            onChange={(e) => setInput({...input, code: e.target.value})}
                                            required
                                        />
                                        <small className="text-danger">{error.code ? error.code : ''}</small>
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Referal dari Marketing</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            value={input.marketing}
                                            options={marketing}
                                            disableClearable
                                            renderInput={(params) => <TextField {...params} placeholder="Referal dari Marketing" onChange={handleSearchMarketing} required />}
                                            onChange={handleChangeMarketing}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Kategori Toko</label>
                                        <Autocomplete 
                                            size="small"
                                            fullWidth
                                            value={input.category}
                                            options={category}
                                            disableClearable
                                            renderInput={(params) => <TextField {...params} placeholder="Kategori Toko" required />}
                                            onChange={handleChangeCategory}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Nama Toko</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            placeholder="Nama Toko"
                                            onChange={(e) => setInput({...input, name: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Alamat Toko</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            placeholder="Alamat Toko"
                                            onChange={(e) => setInput({...input, address: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Nomor Telephone</label>
                                        <TextField 
                                            error={ error.phone ? true: false }
                                            size="small"
                                            fullWidth
                                            placeholder="Nomor Telephone"
                                            onChange={(e) => setInput({...input, phone: e.target.value})}
                                            required
                                        />
                                        <small className="text-danger">{error.phone ? error.phone : ''}</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Latitude</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            placeholder="Latitude"
                                            onChange={(e) => setInput({...input, lat: e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Longitude</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            placeholder="Longitude"
                                            onChange={(e) => setInput({...input, long: e.target.value})}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label className="form-label form-label-m-0">Nomor Telephone</label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" onChange={handleChangeImage} className="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label form-label-m-0">Keterangan</label>
                                        <textarea style={{height: '100px'}} placeholder="Keterangan" onChange={(e) => setInput({...input, desc: e.target.value})} className="form-control"></textarea>
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
        </Store>
    )
}

export default StoreForm
