import React, { useEffect, useRef, useState } from 'react'
import Employee from '../Employee'
import { Button } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { imageResizer } from '../../../utils'
import { storeEmployee } from '../../../models/employee/employee_m'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

import Loading from '../../loading/Loading'
import { getAllEmployeePosition } from '../../../models/employee/employee_position_m'
import { getAllEmployeeJabatanByPosisi } from '../../../models/employee/employee_jabatan_m'

const EmployeeForm = () => {
    const dispacth = useDispatch();
    const { register, handleSubmit } = useForm();

    const { username } = useParams();

    const [position, setPosition] = useState([]);
    const [jabatan, setJabatan] = useState([]);
 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    // get data
    const getPosition = async() => {
        try {
            const response = await dispacth(getAllEmployeePosition()).unwrap().catch((err) => {});
            setPosition(response.data);
        } catch (error) {
            
        }
    }

    const getJabatan = async(code_posisi) => {
        try {
            const response = await dispacth(getAllEmployeeJabatanByPosisi(code_posisi)).unwrap().catch((err) => {});
            setJabatan(response.data);
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getPosition();
    }, []);

    const handlePosisi = (e) => {
        if (e) {
            return getJabatan(e.target.value);
        }  
    }
    
    const onSubmit = async(data) => {
        setLoading(true);
        if (data.photo.length > 0) {
            data.photo = await imageResizer(data.photo[0], 240, 240)
        } else {
            data.photo = '';
        }

        if (data.docs.length > 0) {
            data.docs = await imageResizer(data.docs[0], 768, 400);
        } else {
            data.docs = '';
        }

        try {
            const response = await dispacth(storeEmployee(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                setLoading(false);
                toast.error('Periksa kembali data Anda');
                setError(response.message);
            }

            if (response.status === 201) {
                toast.success('Data berhasil disimpan');
                setTimeout(() => {
                   return window.location.href = `/${username}/employee/data` 
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Lost connection');
            setTimeout(() => {
               return window.location.reload(); 
            }, 1200);
        }
    }

  return (
        <Employee>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div style={{lineHeight: '60%'}}>
                            <h3>BUAT DATA KARYAWAN</h3>
                            <span>Form Input Karyawan</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Karyawan</label>
                                        <input type="text" className="form-control" placeholder="Tulis Kode Karyawan" {...register('code')} required />
                                        <small className="text-danger">{ error.code ? error.code : ''}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nama Lengkap</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nama Lengkap" {...register('name')} required />
                                    </div>
                                    <div>
                                        <label className="form-label">Alamat</label>
                                        <input type="text" className="form-control" placeholder="Tulis Alamat" {...register('address')} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Nomor Handphone</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nomor Handphone" {...register('phone')} required />
                                        <small className="text-danger">{ error.phone ? error.phone : ''}</small>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pendidikan Terakhir</label>
                                        <input type="text" className="form-control" placeholder="Tulis Pendidikan Terakhir" {...register('last_education')} required />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label className="form-label">Posisi</label>
                                            <select {...register('posisi')} className="form-select"  onChange={handlePosisi} required>
                                            <option value="">-- Pilih Posisi --</option>
                                                {
                                                    position.map((data, index) => {
                                                        return (
                                                            <option key={index} value={ data.code }>{ data.name }</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Jabatan</label>
                                            <select className="form-select" {...register('jabatan')} required>
                                                <option value="">-- Pilih Jabatan --</option>
                                                {
                                                    jabatan.map((data, index) => {
                                                        return (
                                                            <option key={index} value={data.code}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Hak Akses</label>
                                        <select className="form-select" {...register('type')} required>
                                            <option value="">-- Pilih Hak Akses --</option>
                                            {
                                                jabatan.map((data, index) => {
                                                    return (
                                                        <option key={index} value={data.code}>{data.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Username</label>
                                        <input type="text" className="form-control" placeholder="Tulis Username (Optional)" {...register('username')} />
                                        <small className="text-danger">{ error.username ? error.username : ''}</small>
                                    </div>
                                    <div>
                                        <label className="form-label">Password</label>
                                        <input type="text" className="form-control" placeholder="Tulis Password (Optional)" {...register('password')} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Upload Foto</label>
                                        <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" {...register('photo')} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Upload Dokumen</label>
                                        <input type="file" className="form-control" accept="image/png, image/jpg, image/jpeg" {...register('docs')} />
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
        </Employee>
    )
}

export default EmployeeForm
