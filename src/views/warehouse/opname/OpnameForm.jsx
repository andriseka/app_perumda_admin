import React, { useEffect, useState } from 'react'
import Warehouse from '../Warehouse'
import { ReplyAll } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { Button, TextField } from '@mui/material'
import { getDetailOpname, updateOpnameData } from '../../../models/opname/opname_m'
import Loading from '../../loading/Loading'
import Moment from 'react-moment'

import { imageResizer } from '../../../utils'

const OpnameForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { username, code } = useParams();

    const handleOpnameData = () => {
        return navigate(-1)
    }

    

    const [opname, setOpname] = useState([]);
    const [opnameLists, setOpnameLists] = useState([]);

    const [loading, setLoading] = useState(false);

    const getDataDetailOpname = async() => {
        try {
            const response = await dispatch(getDetailOpname(code)).unwrap().catch((err) => {});
            if (response.status === 200) {
                setOpname(response.opname)
                setOpnameLists(response.opname_lists)
            } else {
                setLoading(true);
                toast.error('Data tidak ditemukan')
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/opname/data` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetailOpname()
    }, []);

    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const waktu = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    const [input, setInput] = useState({
        petugas: '', desc: '', file: '', date: `${year}-${month}-${day}`, time: waktu
    })
    const [lists, setLists] = useState([]);

    // handle change
    const handleChangeFile = async(e) => {
        const file = e.target.files[0];
        const resizer = await imageResizer(file, 240, 240)
        setInput({...input, file: resizer})
    }

    const handleChangeQty = (e, code_product) => {
        if (e.target.value !== '') {
            const newLists = opnameLists.map(data => {
                if (data.code_product === code_product) {
                    return {...data, accept_qty: e.target.value}
                }
                return data;
            })
            setOpnameLists(newLists)
        }
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            code: opname.code,
            ...input,
            opname_lists : {...opnameLists}
        }
        try {
            const response = await dispatch(updateOpnameData(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Data berhasil disimpan')
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/opname/data` 
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
                                <h3>FORM OPNAME</h3>
                                <span>Formulir Opname Produk</span>
                            </div>
                            <div className="d-flex">
                                <div onClick={handleOpnameData} className="text-center me-2" style={{cursor: 'pointer'}}>
                                    <span className="btn btn-icon btn-orange" style={{padding: '.4rem .4rem'}}>
                                        <ReplyAll sx={{width: '1.25rem', height: '1.25rem'}} />
                                    </span>
                                    <span style={{fontSize: '12px'}} className="d-block">Kembali</span>
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
                                    <div className="mb-3">
                                        <table className="table table-borderlesss">
                                            <tbody>
                                                <tr>
                                                    <th>Kode Opname</th>
                                                    <td>: { opname.code ? opname.code: '' }</td>
                                                </tr>
                                                <tr>
                                                    <th>Tanggal Opname</th>
                                                    <td>
                                                        : <Moment format="dddd, DD MMMM YYYY">{opname.tgl_opname}</Moment>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
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
                                                    <th className="table-border-end text-center" style={{width: '15%'}}>
                                                        <span className="form-control">Opname</span>
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    opnameLists.map((data, index) => (
                                                        <tr key={index}>
                                                            <td className="text-center">{index + 1}</td>
                                                            <td>{data.code_product}</td>
                                                            <td>{data.product}</td>
                                                            <td>{data.category}</td>
                                                            <td>{data.merk}</td>
                                                            <td>
                                                                <TextField 
                                                                    size="small"
                                                                    fullWidth
                                                                    placeholder="Jml"
                                                                    type="number"
                                                                    onChange={(e) => handleChangeQty(e, data.code_product)}
                                                                    required
                                                                />
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label form-label-m-0">Petugas</label>
                                        <TextField 
                                            size="small"
                                            fullWidth
                                            placeholder="Tulis Nama Petugas"
                                            onChange={(e) => setInput({...input, petugas: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label form-label-m-0">Keterangan</label>
                                        <textarea required placeholder="Tulis Keterangan" className="form-control" style={{height: '100px'}} onChange={(e) => setInput({...input, desc: e.target.value})}></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Bukti Opname</label>
                                        <input type="file" accept="image/png, image/jpg, image/jpeg" required className="form-control" onChange={handleChangeFile} />
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
        </Warehouse>
    )
}

export default OpnameForm
