import React, { useEffect, useState } from 'react'
import Employee from '../Employee'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { getDetailEmployee, updateEmployee, updateEmployeePhoto } from '../../../models/employee/employee_m';
import toast from 'react-hot-toast';
import Loading from '../../loading/Loading';
import { ArrowBackIosNew } from '@mui/icons-material';

import { noimage } from '../../images';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { b64toBlob, imageResizer } from '../../../utils';
import { Camera, CameraResultType } from '@capacitor/camera';

const EmployeeDataDetail = () => {
    const dispacth = useDispatch();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState([]);

    const { register, handleSubmit, reset } = useForm({
        defaultValues: employee
    });

    const { username, employee_username } = useParams();

    const [picture, setPicture] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const getDataDetail = async() => {
        try {
            const response = await dispacth(getDetailEmployee(employee_username)).unwrap().catch((err) => {});
            if (response.status === 404) {
                setLoading(true);
                toast.error('Data karyawan tidak ditemukan')
                setTimeout(() => {
                    return window.location.href = `/${username}/employee/data`
                }, 1200);
            }

            if (response.status === 200) {
                setEmployee(response.data);
                reset(response.data)
            }
        } catch (error) {
            setLoading(false);
            toast.error('Lost connection data')
            setTimeout(() => {
                return window.location.href = `/${username}/employee/data`
            }, 1200);
        }
    }

    useEffect(() => {
        getDataDetail();
    }, []);

    const handleBack = () => {
        return window.location.href = `/${username}/employee/data`
    }

    const onUpdate = async(data) => {
        setLoading(true);

        if (data.new_docs.length > 0) {
            data.new_docs = await imageResizer(data.new_docs[0], 768, 400);
        } else {
            data.new_docs = ''
        }

        data = {
            code: data.code,
            name: data.name,
            address: data.address,
            phone: data.phone,
            username: data.username,
            password: data.password,
            last_education: data.last_education,
            docs : data.new_docs
        }

        try {
            const response  = await dispacth(updateEmployee(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                toast.error('Periksa kembali data Anda');
                setLoading(false);
                setError(response.message);
            }

            if (response.status === 200) {
                toast.success('Data berhasil diupdate');
                setTimeout(() => {
                   return window.location.href = `/${username}/employee/data/${data.username}` 
                }, 1200);
            }
        } catch (error) {
            toast.error('Connecting lost data');
            setTimeout(() => {
                return window.location.href = `/${username}/employee/data`
            }, 1200);
        }
    }


    const takePhoto = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 20,
                allowEditing: true,
                resultType: CameraResultType.Base64
            })

            const imageUrl = image.base64String;
            setPicture('data:image/png;base64,' + imageUrl);

            const blob = b64toBlob(imageUrl, 'image/png');
            const file = new File([blob], 'image.png', {
                type: blob.type,
                lastModified: new Date().getTime()
            })
            
            const resize = await imageResizer(file, 240, 240);

            const data = {
                code: employee.code,
                photo: resize
            }

            const response = await dispacth(updateEmployeePhoto(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Foto profile berhasil diperbaharui');
                setTimeout(() => {
                    return window.location.reload(); 
                }, 1000);
            }

        } catch (error) {
            
        }
    }

    return (
        <Employee>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>{ employee.name ? employee.name : '' }</h3>
                                <span>Detail Data Karyawan</span>
                            </div>
                            <div>
                                <span onClick={handleBack} className="px-1 py-2 rounded-circle" style={{backgroundColor: 'orange', cursor: 'pointer'}}>
                                    <ArrowBackIosNew  sx={{color: '#ffffff'}} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <form onSubmit={handleSubmit(onUpdate)}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="text-center">
                                        <img src={ picture ? picture : employee.photo } alt="" className="photo-profile" />
                                        <div className="mb-2">
                                            <span onClick={takePhoto} className="btn-update-foto">
                                                Update Foto
                                            </span>
                                        </div>
                                        <div>
                                            <span style={{fontSize: '16px', fontWeight: 'bold'}} >{ employee.name ? employee.name : '' }</span> <br />
                                            <span>{ employee.posisi } ( { employee.jabatan } ) </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Kode Karyawan</label>
                                        <input type="text" className="form-control" defaultValue={employee.code} disabled />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Nama Karyawan</label>
                                        <input type="text" className="form-control" {...register('name')} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Alamat</label>
                                        <input type="text" className="form-control" {...register('address')} required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Pendidikan</label>
                                        <input type="text" className="form-control" {...register('last_education')} required />
                                    </div>
                                    <div>
                                        <label className="form-label">Nomor Handphone</label>
                                        <input type="text" className="form-control" {...register('phone')} required />
                                        <small className="text-danger">{ error.phone ? error.phone : '' }</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Posisi</label>
                                            <input type="text" className="form-control" defaultValue={employee.posisi} disabled />
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Jabatan</label>
                                            <input type="text" className="form-control" defaultValue={employee.jabatan} disabled />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Update Dokumen</label>
                                        <input type="file" className="form-control" {...register('new_docs')} />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Username</label>
                                            <input type="text" className="form-control" {...register('username')} required />
                                            <small className="text-danger">{ error.username ? error.username : '' }</small>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="text" className="form-control" placeholder="******" {...register('password')} />
                                        </div> 
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <Button variant="contained" color="success" type="submit">
                                            Update Data
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

export default EmployeeDataDetail
