import React from 'react'
import { atk, coffe, water } from '../images'
import { Button } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import Verified from '../../verified/Verified'

const ScreenSelectRole = () => {

    const navigate = useNavigate();
    const { username } = useParams();

    const onClick = () => {
        return navigate(`/${username}/welcome-screen`)
    }

    return (
        <Verified>
            <div className="screen-select">
                <div className="w-full h-full d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-md-4 mb-3 col-6">
                            <div className="card">
                                <img src={ coffe } alt="" className="img-screen-select" />
                                <div className="card-body">
                                    <div className="text-center">
                                        <h2>PERDAGANGAN KOPI</h2>
                                    </div>
                                    <div className="mb-3 desc">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ullam iste rerum iure, facilis
                                    </div>
                                    <div>
                                        <Button onClick={onClick} fullWidth variant="contained">
                                            Masuk
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 col-6">
                            <div className="card">
                                <img src={ atk } alt="" className="img-screen-select" />
                                <div className="card-body">
                                    <div className="text-center">
                                        <h2>PERDAGANGAN ATK</h2>
                                    </div>
                                    <div className="mb-3 desc">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ullam iste rerum iure, facilis
                                    </div>
                                    <div>
                                        <Button onClick={onClick} fullWidth variant="contained">
                                            Masuk
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3 col-6">
                            <div className="card">
                                <img src={ water } alt="" className="img-screen-select" />
                                <div className="card-body">
                                    <div className="text-center">
                                        <h2>PERDAGANGAN AIR</h2>
                                    </div>
                                    <div className="mb-3 desc">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ullam iste rerum iure, facilis
                                    </div>
                                    <div>
                                        <Button onClick={onClick} fullWidth variant="contained">
                                            Masuk
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Verified>
    )
}

export default ScreenSelectRole
