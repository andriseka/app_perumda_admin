import React, { useState } from 'react'

import { AccountCircle, Logout, MenuOpen } from '@mui/icons-material'

import profile from '../../assets/avatars/profile.jpg'
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, SwipeableDrawer, Tooltip } from '@mui/material'


import _sidebar from './_sidebar';
import { Link, useLocation, useParams } from 'react-router-dom';

import logo from '../../assets/logo/logo.png'
import Verified from '../../verified/Verified';

const Layouts = ({ children }) => {
    const { username } = useParams();
    const location = useLocation();
    const path = location.pathname;
    const split = path.split('/');


    const [toggle, setToggle] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const toggleDrawer = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setToggle(open);
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Box sx={{ padding: '1rem 4rem 1rem 4rem', backgroundColor: '#0000009c' }}>
                <img src={ logo } alt="" />
            </Box>
            
            <List>
                {
                    _sidebar.map((data, idx) => (
                            <Link to={`/${username}/${data.to}`} key={idx}>
                                <ListItem sx={{":hover" : { backgroundColor: '#00000094' }, backgroundColor: split[2] === data.active ? '#00000094' : '' }} disablePadding>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <data.icon sx={{color: '#ffffff'}} />
                                        </ListItemIcon>
                                        <ListItemText primary={data.name} sx={{color: '#ffffff'}} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                    ))
                }
            </List>
        </Box>
    );

    return (
        <Verified>
            <div className="page">
                <header className="navbar navbar-expand-md shadow-sm navbar-expand-sm navbar-light d-lg-flex d-print-none sticky-top">
                    <div className="container-fluid navbar-mobile">
                        <div className="navbar-nav navbar-collapse">
                            <div className="nav-item me-3">
                                <span className="toggle-sidebar" onClick={toggleDrawer(true)}>
                                    <MenuOpen />
                                </span>
                            </div>
                            <div className="nav-item">
                                <a href="">
                                    <img src={ logo } alt="" height="40" />
                                </a>
                            </div>
                        </div>
                        <div className="navbar-nav">
                            <div className="nav-item dropdown">
                                <span onClick={handleClick} className="nav-link d-flex lh-1 text-reset p-0" aria-label="Open user menu" style={{cursor: 'pointer'}}>
                                    <Tooltip title="Account Setting">
                                        <span className="avatar avatar-sm"  aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                                            <img src={profile} alt="" className="rounded-circle" />
                                        </span>
                                    </Tooltip>
                                    <div className="d-none d-xl-block ps-2">
                                        <div>Administrator</div>
                                        <div className="mt-1 small text-muted">Administrator</div>
                                    </div>
                                </span>
                                <Menu
                                    elevation={0}
                                    sx={{
                                        overflow: 'visible',
                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                        mt: 1.5,
                                        '& .MuiAvatar-root': {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: 'background.paper',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                        '& div': {
                                            width: '180px',
                                        }
                                    }}
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    
                                >
                                    <MenuItem>
                                        <Link>
                                            <ListItemIcon>
                                                <AccountCircle fontSize="small" sx={{mr: 1}} /> Profile
                                            </ListItemIcon>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link to={`/${username}/welcome-screen`}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" sx={{mr: 1}} /> Kembali
                                            </ListItemIcon>
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </header>

                <SwipeableDrawer
                    PaperProps={{
                        sx: {
                            backgroundColor: "#0000008f"
                        }
                    }}
                    anchor="left"
                    open={toggle}
                    onClose={toggleDrawer(false)}
                    onOpen={toggleDrawer(true)}
                >
                    {list("left")}
                </SwipeableDrawer>

                <div className="page-wrapper">
                    <div className="container-fluid">
                        <div className="page-body">
                            <div className="row row-deck">
                                { children }
                            </div>
                        </div>
                    </div>
                    
                    <footer className="footer footer-transparent bg-success d-print-none">
                        <div className="container-xl">
                            <div className="row text-center align-items-center justify-content-center">
                                <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                                    <ul className="list-inline list-inline-dots mb-0">
                                        <li className="list-inline-item">
                                            <span className="fs-3 fw-bold">Smart Perumda Aneka Usaha Jepara © 2022</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </Verified>
    )
}

export default Layouts
