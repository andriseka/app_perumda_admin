import React, { useEffect, useState } from 'react'
import MitraMarketing from '../MitraMarketing'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { getDetailMarketing, updateDataMarketing, updateImageMarketing } from '../../../../models/marketing/marketing_m';
import { Camera, CameraResultType } from '@capacitor/camera';
import { b64toBlob, imageResizer } from '../../../../utils';
import toast from 'react-hot-toast';
import { Button } from '@mui/material';
import Mitra from '../../Mitra';
import Loading from '../../../loading/Loading';
import { ArrowBackIosNew } from '@mui/icons-material';

const MitraMarketingDetail = () => {
    const dispatch = useDispatch();

    const { username, code } = useParams();

    const [marketing, setMarketing] = useState([]);
    const [loading, setLoading] = useState(false);

    const { register, reset, handleSubmit } = useForm({
        defaultValues: marketing
    })

    const [picture, setPicture] = useState('');

    const getDetail = async() => {
        try {
            const response = await dispatch(getDetailMarketing(code)).unwrap().catch((err) => {});
            if (response.status === 404) {
                setLoading(true);
                toast.error('Data Tidak Ditemukan')
                setTimeout(() => {
                   return window.location.href = `/${username}/mitra/marketing/data` 
                }, 1000);
            }

            if (response.status === 200) {
                setMarketing(response.data);
                reset(response.data)
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getDetail()
    }, [])

    const handleBack = () => {
        return window.location.href = `/${username}/mitra/marketing/data`
    }

    const takePhoto = async() => {
        try {
            const image = await Camera.getPhoto({
                quality: 30,
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
                code: code,
                image: resize
            }

            const response = await dispatch(updateImageMarketing(data)).unwrap().catch((err) => {});
            if (response.status === 200) {
                toast.success('Gambar berhasil diperbaharui');
                setTimeout(() => {
                   return window.location.reload(); 
                }, 1000);
            }

        } catch (error) {
            
        }
    }

    const company = (
        <>
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Kode Supplier</label>
                            <input type="text" className="form-control" {...register('code')} disabled />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NIB Perusahaan</label>
                            <input type="text" className="form-control" {...register('no_identity')} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nama Perusahaan</label>
                            <input type="text" className="form-control" {...register('name')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bidang Usaha</label>
                            <input type="text" className="form-control" {...register('usaha')} required />
                        </div>
                        <div>
                            <label className="form-label">Alamat</label>
                            <input type="text" className="form-control" {...register('address')} required />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Kontak Perusahaan</label>
                            <input type="text" className="form-control" {...register('contact_primary')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nama PIC</label>
                            <input type="text" className="form-control" {...register('contact_name')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kontak PIC</label>
                            <input type="text" className="form-control" {...register('contact_secondary')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" {...register('email')} required />
                        </div>
                        <div>
                            <label className="form-label">Webiste</label>
                            <input type="text" className="form-control" {...register('website')} placeholder="Tulis Nama Website ( Optional )" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Keterangan</label>
                            <textarea className="form-control" {...register('desc')} ></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant="contained" color="success" type="submit">
                                Update Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const individu = (
        <>
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Kode Supplier</label>
                            <input type="text" className="form-control" {...register('code')} disabled />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">NIK</label>
                            <input type="text" className="form-control" {...register('no_identity')} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nama Supplier</label>
                            <input type="text" className="form-control" {...register('name')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bidang Usaha</label>
                            <input type="text" className="form-control" {...register('usaha')} required />
                        </div>
                        <div>
                            <label className="form-label">Alamat</label>
                            <input type="text" className="form-control" {...register('address')} required />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Kontak Umum</label>
                            <input type="text" className="form-control" {...register('contact_primary')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kontak Darurat</label>
                            <input type="text" className="form-control" {...register('contact_secondary')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" {...register('email')} placeholder="Tulis Email" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Keterangan</label>
                            <textarea className="form-control" style={{height: '60px'}} {...register('desc')}></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant="contained" color="success" type="submit">
                                Update Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const onUpdate = async(data) => {
        data = {
            code: code,
            no_identity : data.no_identity,
            name: data.name,
            usaha : data.usaha,
            address : data.address,
            contact_primary: data.contact_primary,
            contact_name : data.contact_name,
            contact_secondary : data.contact_secondary,
            email : data.email,
            website : data.website,
            desc : data.desc
        }

        try {
            const response = await dispatch(updateDataMarketing(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                toast.error('Periksa kembali data Anda')
                setTimeout(() => {
                   window.location.reload(); 
                }, 1000);
            }

            if (response.status === 200) {
                toast.success('Data berhasil diperbaharui')
                setTimeout(() => {
                    window.location.reload(); 
                }, 1200);
            }
        } catch (error) {
            
        }
    }

    return (
        <Mitra>
            { loading ? <Loading />  : '' }
            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center">
                            <div style={{lineHeight: '60%'}}>
                                <h3>{ marketing.name ? marketing.name : '' }</h3>
                                <span>Detail Data Supplier</span>
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
                                        <img src={ picture ? picture : marketing.image } alt="" className="photo-profile" />
                                        <div className="mb-3">
                                            <span onClick={takePhoto} className="btn-update-foto">
                                                Update Foto
                                            </span>
                                        </div>
                                        <div className="mb-3">
                                            <span style={{fontSize: '16px', fontWeight: 'bold'}} >{ marketing.name ? marketing.name : '' }</span> <br />
                                            <span>( { marketing.status === 'company' ? 'Perusahaan' : 'Perorangan' } ) </span>
                                        </div>
                                        <div>
                                            <Button variant="contained" color="success" size="small">
                                                { marketing.contact_primary }
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            marketing.status === 'company' ? company : individu
                        }
                        
                    </div>
                </form>
            </div>
        </Mitra>
    )
}

export default MitraMarketingDetail
