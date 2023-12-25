import React, { useState } from 'react'
import MitraMarketing from '../MitraMarketing'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import Loading from '../../../loading/Loading';
import { imageResizer } from '../../../../utils';
import { storeMarketing } from '../../../../models/marketing/marketing_m';
import toast from 'react-hot-toast';

const MitraMarketingForm = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState([]);

    const [status, setStatus] = useState('');

    const { username } = useParams();

    const navigate = useNavigate();

    const handleStatus = (e) => {
        if (e) {
            setStatus(e.target.value)
        }
    }

    const company = (
        <>
            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">NIB</label>
                            <input type="text" className="form-control" placeholder="Tulis NIB Perusahaan" {...register('no_identity')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bidang Usaha</label>
                            <input type="text" className="form-control" placeholder="Tulis Bidang Usaha" {...register('usaha')} required />
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
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Tulis Email" {...register('email')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <input type="text" className="form-control" placeholder="Tulis Website ( Optional )" {...register('website')} />
                        </div>
                        <div>
                            <label className="form-label">Kontak Perusahaan</label>
                            <input type="text" className="form-control" placeholder="Tulis Kontak Perusahaan" {...register('contact_primary')} required />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Nama PIC</label>
                            <input type="text" className="form-control" placeholder="Tulis Nama PIC" {...register('contact_name')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Kontak PIC</label>
                            <input type="text" className="form-control" placeholder="Tulis Kontak PIC" {...register('contact_secondary')} required />
                        </div>
                        <div>
                            <label className="form-label">Upload Foto</label>
                            <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control" {...register('image')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Keterangan</label>
                            <textarea className="form-control" style={{height: '140px'}} placeholder="Tulis Keterangan" {...register('desc')}></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant="contained" color="primary" type="submit">
                                Simpan Data
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
                            <label className="form-label">NIK</label>
                            <input type="text" className="form-control" placeholder="Tulis NIK" {...register('no_identity')} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Bidang Usaha</label>
                            <input type="text" className="form-control" placeholder="Tulis Bidang Usaha" {...register('usaha')} required />
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
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" placeholder="Tulis Email" {...register('email')} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Website</label>
                            <input type="text" className="form-control" placeholder="Tulis Website ( Optional )" {...register('website')} />
                        </div>
                        <div>
                            <label className="form-label">Kontak Umum</label>
                            <input type="text" className="form-control" placeholder="Tulis Kontak Umum" {...register('contact_primary')} required />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Kontak Darurat</label>
                            <input type="text" className="form-control" placeholder="Tulis Kontak Darurat" {...register('contact_secondary')} required />
                        </div>
                        <div>
                            <label className="form-label">Upload Foto</label>
                            <input type="file" accept="image/png, image/jpg, image/jpeg" className="form-control" {...register('image')} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-4 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Keterangan</label>
                            <textarea className="form-control" style={{height: '60px'}} placeholder="Tulis Keterangan" {...register('desc')}></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <Button variant="contained" color="primary" type="submit">
                                Simpan Data
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    const onSubmit = async(data) => {
        setLoading(true);
        if (data.image.length > 0) {
            data.image = await imageResizer(data.image[0], 240, 240);
        } else {
            data.image = ''
        }

        try {
            const response = await dispatch(storeMarketing(data)).unwrap().catch((err) => {});
            if (response.status === 400) {
                setLoading(false);
                setError(response.message);
                toast.error('Periksa kembali data Anda');
            }
            if (response.status === 201) {
                setLoading(false);
                toast.success('Data berhasil disimpan');
                setTimeout(() => {
                    return navigate(`/${username}/mitra/marketing/data`)
                }, 1000);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Lost connection data');
            return navigate(`/${username}/dashboard`);
        }
    }

    return (
        <MitraMarketing>
            { loading ? <Loading /> : '' }
            <div className="mt-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label className="form-label">Status Marketing</label>
                                        <select {...register('status')} className="form-select" onChange={handleStatus} required>
                                            <option value="">-- Pilih Status --</option>
                                            <option value="company">Badan</option>
                                            <option value="individu">Perorangan</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Kode Marketing</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nama Marketing" {...register('code')} required />
                                    </div>
                                    <div>
                                        <label className="form-label">Nama Marketing</label>
                                        <input type="text" className="form-control" placeholder="Tulis Nama Marketing" {...register('name')} required />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            status === 'company' ? company : status === 'individu' ? individu : ''
                        }
                       
                    </div>
                </form>
            </div>
        </MitraMarketing>
    )
}

export default MitraMarketingForm
