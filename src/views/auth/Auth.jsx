import React, { useState } from 'react'
import { bglogin, logo } from '../images'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { AccountCircle, Lock, Visibility, VisibilityOff } from '@mui/icons-material'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../models/auth/auth_m'
import toast, { Toaster } from 'react-hot-toast'
import Loading from '../loading/Loading'

const Auth = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const onSubmit = async(data) => {
        setLoading(true);
        try {
            const response = await dispatch(loginUser(data)).unwrap().catch((err) => {});
            if (response.status === 400 || response.status === 403) {
                setLoading(false);
                setError('Periksa Username & Password Anda');
            }
            if (response.status === 200) {
                toast.success('Anda berhasil login');
                localStorage.setItem('user_data', JSON.stringify(response.data));
                setTimeout(() => {
                    return window.location.href = `/${data.username}/select-role` 
                }, 1200);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Something is wrong. Please contact CS')
        }
    }

    return (
        <div>
            <Toaster position="top-right" />
            { loading ? <Loading /> : '' }
            <div className="row g-0 flex-fill">
                <div className="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
                    <div className="bg-cover h-100 min-vh-100" style={{ backgroundImage: `url(${bglogin})` }}></div>
                </div>
                <div className="col-12 col-lg-6 col-xl-4 border-top-wide border-primary d-flex flex-column justify-content-center">
                    <div className="container container-tight my-5 px-lg-5">
                        <div className="login-mobile">
                            <div className="text-center mb-2">
                                <a href="" className="navbar-brand navbar-brand-autodark">
                                    <img src={ logo } alt="" />
                                </a>
                            </div>
                            <h2 className="h3 text-center mb-3">
                                Login to your account
                            </h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-3">
                                    <TextField 
                                        fullWidth
                                        placeholder='Username'
                                        label="Username"
                                        {...register('username')}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AccountCircle sx={{mr: 1}} />
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                    <small className="text-danger">{ error ? error : '' }</small>
                                </div>
                                <div className="mb-3">
                                    <TextField 
                                        fullWidth
                                        placeholder='Password'
                                        label="Password"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password')}
                                        required
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Lock sx={{mr: 1}} />
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                    />
                                </div>
                                <div className="form-footer">
                                    <Button type="submit" variant="contained" color="primary" fullWidth>
                                        LOGIN
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth
