import React, { useEffect, useState } from 'react'

import MitraSupplier from '../MitraSupplier'
import { Button, Checkbox, ListItemText, MenuItem, Select, TextField } from '@mui/material'
import { useDispatch } from 'react-redux'
import { getProductCategory } from '../../../../models/product/product_category_m'

import { imageResizer } from '../../../../utils'
import { storeSupplier } from '../../../../models/supplier/supplier_m'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import Loading from '../../../loading/Loading'

const MitraSupplierForm = () => {
    const dispatch = useDispatch();
    const { username } = useParams();

    const [input, setInput] = useState({
        code: '', name: '', status: '', no_identity: '', category_code: [],
        address: '', email: '', website: '', contact_primary: '', contact_name: '',
        contact_secondary: '', image: '', desc: ''
    })

    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])

    const getDatacategory = async(page) => {
        try {
            const response = await dispatch(getProductCategory(page)).unwrap().catch((err) => {});
            setCategory(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDatacategory(1);
    }, []);

    // handle change
    const handleChangeMultipleCategory = (event) => {
        const { target: { value }, } = event;
        setInput({
            ...input,
            category_code: typeof value === 'string' ? value.split(',') : value,
        })
    }
    const handleChaneImage = async(e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const resizer = await imageResizer(file, 240, 240);
            setInput({...input, image: resizer})
        }
    }

    // if company / individu form
    const companyForm = (
        <>
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">NIB</label>
                            <TextField 
                                error={error.no_identity ? true: false}
                                size="small"
                                fullWidth
                                placeholder="NIB Perusahaan"
                                required
                                onChange={(e) => setInput({...input, no_identity: e.target.value})}
                            />
                            <small className="text-danger">{error.no_identity ? error.no_identity : ''}</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Bidang Usaha</label>
                            <Select
                                multiple
                                displayEmpty
                                size="small"
                                fullWidth
                                value={input.category_code}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <span>Bidang Usaha</span>;
                                    }
                                    return selected.join(', ');
                                }}
                                required
                                onChange={handleChangeMultipleCategory}
                            >
                                <MenuItem disabled value="">
                                    Bidang Usaha
                                </MenuItem>
                                {
                                    category.map((data) => (
                                        <MenuItem key={data.no} value={data.code}>
                                            <Checkbox checked={input.category_code.indexOf(data.code) > -1} />
                                            <ListItemText primary={data.name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>

                        <div>
                            <label className="form-label">Alamat</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Alamat Supplier"
                                required
                                onChange={(e) => setInput({...input, address: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Email"
                                type="email"
                                required
                                onChange={(e) => setInput({...input, email: e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Link Website (Optional)"
                                onChange={(e) => setInput({...input, website: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="form-label">Kontak Perusahaan</label>
                            <TextField 
                                error={error.contact_primary ? true : false}
                                size="small"
                                fullWidth
                                placeholder="Kontak Perusahaan"
                                required
                                onChange={(e) => setInput({...input, contact_primary: e.target.value})}
                            />
                            <small className="text-danger">{error.contact_primary ? error.contact_primary : ''}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Nama PIC</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Nama PIC"
                                required
                                onChange={(e) => setInput({...input, contact_name: e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Kontak PIC</label>
                            <TextField 
                                error={error.contact_secondary ? true : false}
                                size="small"
                                fullWidth
                                placeholder="Kontak PIC"
                                required
                                onChange={(e) => setInput({...input, contact_secondary: e.target.value})}
                            />
                            <small className="text-danger">{error.contact_secondary ? error.contact_secondary : ''}</small>
                        </div>

                        <div>
                            <label className="form-label">Upload Foto</label>
                            <input type="file" onChange={handleChaneImage} className="form-control" />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

    const individuForm = (
        <>
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">NIK</label>
                            <TextField 
                                error={error.no_identity ? true: false}
                                size="small"
                                fullWidth
                                placeholder="NIK"
                                required
                                onChange={(e) => setInput({...input, no_identity: e.target.value})}
                            />
                            <small className="text-danger">{error.no_identity ? error.no_identity : ''}</small>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Bidang Usaha</label>
                            <Select
                                multiple
                                displayEmpty
                                size="small"
                                fullWidth
                                value={input.category_code}
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return <span>Bidang Usaha</span>;
                                    }
                                    return selected.join(', ');
                                }}
                                required
                                onChange={handleChangeMultipleCategory}
                            >
                                <MenuItem disabled value="">
                                    Bidang Usaha
                                </MenuItem>
                                {
                                    category.map((data) => (
                                        <MenuItem key={data.no} value={data.code}>
                                            <Checkbox checked={input.category_code.indexOf(data.code) > -1} />
                                            <ListItemText primary={data.name} />
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </div>

                        <div>
                            <label className="form-label">Alamat</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Alamat Supplier"
                                required
                                onChange={(e) => setInput({...input, address: e.target.value})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Email"
                                type="email"
                                onChange={(e) => setInput({...input, email: e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Link Website (Optional)"
                                onChange={(e) => setInput({...input, website: e.target.value})}
                            />
                        </div>

                        <div>
                            <label className="form-label">Kontak Umum</label>
                            <TextField 
                                error={error.contact_primary ? true : false}
                                size="small"
                                fullWidth
                                placeholder="Kontak Umum"
                                required
                                onChange={(e) => setInput({...input, contact_primary: e.target.value})}
                            />
                            <small className="text-danger">{error.contact_primary ? error.contact_primary : ''}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Nama Kontak Darurat</label>
                            <TextField 
                                size="small"
                                fullWidth
                                placeholder="Nama Kontak Darurat"
                                required
                                onChange={(e) => setInput({...input, contact_name: e.target.value})}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nomor Kontak Darurat</label>
                            <TextField 
                                error={error.contact_secondary ? true : false}
                                size="small"
                                fullWidth
                                placeholder="Nomor Kontak Darurat"
                                required
                                onChange={(e) => setInput({...input, contact_secondary: e.target.value})}
                            />
                            <small className="text-danger">{error.contact_secondary ? error.contact_secondary : ''}</small>
                        </div>

                        <div>
                            <label className="form-label">Upload Foto</label>
                            <input type="file" onChange={handleChaneImage} className="form-control" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    // submit
    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = {...input}
            const response = await dispatch(storeSupplier(data)).unwrap().catch((err) => {});
            if (response.status === 201) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                   return window.location.href = `/${username}/mitra/supplier/data` 
                }, 1200);
            }

            if (response.status === 400) {
                setLoading(false);
                setError(response.message)
                toast.error('Periksa kembali data Anda')
                setTimeout(() => {
                    setError([]);
                }, 1500);
            }
        } catch (error) {
            
        }
    } 

    return (
        <MitraSupplier>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Supplier</label>
                                        <TextField 
                                            error={error.code ? true: false}
                                            size="small"
                                            fullWidth
                                            placeholder="Kode Supplier"
                                            required
                                            onChange={(e) => setInput({...input, code: e.target.value})}
                                        />
                                        <small className="text-danger">{ error.code ? error.code : '' }</small>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Nama Supplier</label>
                                        <TextField 
                                            error={error.name ? true: false}
                                            size="small"
                                            fullWidth
                                            placeholder="Nama Supplier"
                                            required
                                            onChange={(e) => setInput({...input, name: e.target.value})}
                                        />
                                        <small className="text-danger">{ error.name ? error.name : '' }</small>
                                    </div>

                                    <div>
                                        <label className="form-label">Status Badan</label>
                                        <Select
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                            value={input.status}
                                            onChange={(e) => setInput({...input, status: e.target.value})}
                                            required
                                        >
                                            <MenuItem value="" disabled>Pilih Status Badan</MenuItem>
                                            <MenuItem value="company">Badan</MenuItem>
                                            <MenuItem value="individu">Perorangan</MenuItem>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {
                            input.status === 'company' ? 
                            companyForm : input.status === 'individu' ? 
                            individuForm : ''
                        }

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Deskripsi</label>
                                        <textarea style={{height: '156px'}} placeholder="Deskripsi" onChange={(e) => setInput({...input, desc: e.target.value})} className="form-control"></textarea>
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
        </MitraSupplier>
    )
}

export default MitraSupplierForm
