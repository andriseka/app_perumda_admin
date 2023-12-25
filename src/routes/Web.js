import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import routes from './routes'

// stayles
import '../assets/css/tabler.css'
import '../assets/css/style.css'
import AuthController from '../controllers/auth/AuthController'

function Web() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <AuthController /> } />
                {
                    routes.map((route, idx) => {
                        return (
                            <Route 
                                key={idx}
                                path={`/:username/${route.path}`}
                                element={ <route.element view={ route.view } /> }
                            />
                        )
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default Web
