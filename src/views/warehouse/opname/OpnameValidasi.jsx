import React, { useEffect, useState } from 'react'
import Warehouse from '../Warehouse'
import { ReplyAll } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom'
import { getDetailOpname, validasiOpname } from '../../../models/opname/opname_m'
import { useDispatch } from 'react-redux'
import Moment from 'react-moment'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'
import Loading from '../../loading/Loading'

const OpnameValidasi = () => {
    const { username, code } = useParams();
    const dispatch = useDispatch();
 
    const navigate = useNavigate()
    const handleBack = () => {
        return navigate(-1)
    }

    const [opname, setOpname] = useState([]);
    const [opnameLists, setOpnameLists] = useState([]);

    const [loading, setLoading] = useState(false)

    const getDataDetail = async() => {
        try {
            const response = await dispatch(getDetailOpname(code)).unwrap().catch((err) => {});
            if (response.status === 200) {
                setOpname(response.opname);
                setOpnameLists(response.opname_lists);
            } else {
                setLoading(true);
                toast.error('Data tidak ditemukan')
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/opname` 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await dispatch(validasiOpname(code)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Data berhasil divalidasi');
                setTimeout(() => {
                   return window.location.href = `/${username}/warehouse/opname` 
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
                                <h3>{ opname.code ? opname.code : '' }</h3>
                                <span>Detail Opname</span>
                            </div>
                            <div>
                                <span onClick={handleBack} className="px-1 py-2 rounded-circle" style={{backgroundColor: 'orange', cursor: 'pointer'}}>
                                    <ReplyAll  sx={{color: '#ffffff'}} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form onSubmit={onSubmit}>
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive mb-3">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th>Tanggal Opname</th>
                                            <td>
                                                : <Moment format="dddd, DD MMMM YYYY">{opname.tgl_opname ? opname.tgl_opname : ''}</Moment>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="table-responsive mb-3">
                                <table className="table">
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
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-end">
                                {
                                    opname.validasi === 'tidak' ? 
                                    <Button variant="contained" color="primary" type="submit">
                                        Validasi
                                    </Button> : ''
                                }
                            </div>
                        </div>  
                    </div>
                </form>
            </div>
        </Warehouse>
    )
}

export default OpnameValidasi
