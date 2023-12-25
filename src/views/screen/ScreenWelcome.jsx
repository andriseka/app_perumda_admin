import React, { useState } from 'react'

import moment from 'moment';

import { logo } from '../images'
import { Logout } from '@mui/icons-material'
import { account_icon, rocket_icon, setting_icon } from '../icons';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../loading/Loading';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../models/auth/auth_m';
import toast, { Toaster } from 'react-hot-toast';
import Verified from '../../verified/Verified';

const ScreenWelcome = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user_data = JSON.parse(localStorage.getItem('user_data'));

    const [loading, setLoading] = useState(false);

    const { username } = useParams();

    const goApp = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            return navigate(`/${username}/dashboard`); 
        }, 1200);
    }

    const onLogout = async() => {
        setLoading(true);
        try {
            const response = await dispatch(logoutUser(user_data.username)).unwrap().catch((err) => {});
            if (response.status === 200) {
                localStorage.removeItem('user_data');
                toast.success('Anda berhasil logout');
                setTimeout(() => {
                   return window.location.href = '/' 
                }, 1200);
            }
        } catch (error) {
            setLoading(false);
            toast.error('Something is worng');
        }
    }

    return (
        <Verified>
            { loading ? <Loading /> : '' }
            <Toaster position="top-right" />
            <div className="welcome-screen">
                <header className="welcome-screen-header">
                    <div className="header-content">
                        <div>
                            <img src={ logo } alt="" />
                        </div>

                        <div onClick={onLogout} className="text-center" style={{cursor: 'pointer'}}>
                            <Logout sx={{color: '#ffffff'}} /> 
                            <div className="text-white">
                                Logout
                            </div>
                        </div>
                    </div>
                </header>

                <div className="welcome-screen-content">
                    <div className="desc">
                        <div className="text-center">
                            <h2>SELAMAT DATANG</h2>
                            <span className="name">{ user_data ? user_data.name : '' }</span>
                            <div className="time mt-3 mb-3">
                                { moment().format('D MMMM YYYY') } <br />
                                { moment().format('h:mm:ss') }
                            </div>

                            <div className="status">
                                ADMIN PERDAGANGAN KOPI <br />
                                PERUMDA ANEKA USAHA KAB. JEPARA
                            </div>
                        </div>
                    </div>  
                </div>

                <div className="welcome-screen-footer">
                    <div className="footer-content">
                        <div className="row">
                            <div className="col-4">
                                <div className="child">
                                    <div className="me-2">
                                        <img src={ account_icon } alt="" />
                                    </div>
                                    <div>
                                        <span className="child-title"><span className="br">MY</span> ACCOUNT</span>
                                        <span className="child-subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div onClick={goApp} className="child">
                                    <div className="me-2">
                                        <img src={ rocket_icon } alt="" />
                                    </div>
                                    <div>
                                        <span className="child-title">GO TO APLIKASI</span>
                                        <span className="child-subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="child">
                                    <div className="me-2">
                                        <img src={ setting_icon } alt="" />
                                    </div>
                                    <div>
                                        <span className="child-title">GENERAL SETTING</span>
                                        <span className="child-subtitle">Lorem ipsum dolor sit amet consectetur, adipisicing elit</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="center-bg">
                    <div className="color-bg">
                        <div className="color-bg-transparent">
                            
                        </div>
                    </div>
                </div>
            </div>
        </Verified>
    )
}

export default ScreenWelcome
