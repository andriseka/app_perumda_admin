import React from 'react'
import Layouts from '../layouts/Layouts'
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { Link, useLocation, useParams } from 'react-router-dom'
import { AccountCircle, PlaylistAddCheckCircle, PlaylistAddCircle } from '@mui/icons-material'
import { Toaster } from 'react-hot-toast'

const Employee = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');

    return (
        <Layouts>
             <Toaster position="top-center" />
            <div>
                <h1>KARYAWAN</h1>
            </div>

            <div className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <div className="sub-menu">
                            <ul>
                                <li>
                                    <Link to={`/${username}/employee/form`} className={` sub-menu-item ${split[3] === 'form'? 'active' : ''} `}>
                                        <div className="me-2">
                                            <PlaylistAddCircle />
                                        </div>
                                        <span>Buat Karyawan</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${username}/employee/data`} className={` sub-menu-item ${split[3] === 'data'? 'active' : ''} `} >
                                        <div className="me-2">
                                            <PlaylistAddCheckCircle />
                                        </div>
                                        <span>Data Karyawan</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            
            { children }
            
        </Layouts>
    )
}

export default Employee
