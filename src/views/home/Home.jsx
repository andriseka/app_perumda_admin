import React from 'react'
import Layouts from '../layouts/Layouts'
import Maps from './maps/Maps'

const Home = () => {
    return (
        <Layouts>
            <div className="col-md-3 col-6 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="subheader">Total Pendapatan</div>
                        </div>
                        <div className="h1 mb-3 fw-bold">Rp 2.5 M</div>
                        <div className="d-flex mb-2">
                            <div>Traffik Total Pendapatan</div>
                            <div className="ms-auto">
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                    7%
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 17l6 -6l4 4l8 -8"></path><path d="M14 7l7 0l0 7"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="progress progress-sm">
                            <div className="progress-bar bg-primary" style={{width: '75%'}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span className="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-md-3 col-6 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="subheader">Total Penjualan</div>
                        </div>
                        <div className="h1 mb-3 fw-bold">Rp 2.5 M</div>
                        <div className="d-flex mb-2">
                            <div>Traffik Total Penjualan</div>
                            <div className="ms-auto">
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                    7%
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 17l6 -6l4 4l8 -8"></path><path d="M14 7l7 0l0 7"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="progress progress-sm">
                            <div className="progress-bar bg-primary" style={{width: '75%'}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span className="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="subheader">Target Pendapatan</div>
                        </div>
                        <div className="h1 mb-3 fw-bold">Rp 2.1 M</div>
                        <div className="d-flex mb-2">
                            <div>Traffik Target Pendapatan</div>
                            <div className="ms-auto">
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                    7%
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 17l6 -6l4 4l8 -8"></path><path d="M14 7l7 0l0 7"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="progress progress-sm">
                            <div className="progress-bar bg-primary" style={{width: '75%'}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span className="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-6 mb-3">
                <div className="card">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <div className="subheader">Target Penjualan</div>
                        </div>
                        <div className="h1 mb-3 fw-bold">Rp 2.2 M</div>
                        <div className="d-flex mb-2">
                            <div>Traffik Target Penjualan</div>
                            <div className="ms-auto">
                                <span className="text-green d-inline-flex align-items-center lh-1">
                                    7%
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon ms-1" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M3 17l6 -6l4 4l8 -8"></path><path d="M14 7l7 0l0 7"></path></svg>
                                </span>
                            </div>
                        </div>
                        <div className="progress progress-sm">
                            <div className="progress-bar bg-primary" style={{width: '75%'}} role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" aria-label="75% Complete">
                                <span className="visually-hidden">75% Complete</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="col-md-12 mb-3">
                <Maps />
            </div>
        </Layouts>
    )
}

export default Home
