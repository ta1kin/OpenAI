import { Routes, Route } from 'react-router-dom'

import InfoPage from './pages/Info/InfoPage'
import AuthPage from './pages/Auth/AuthPage'
import NotFoundPage from './pages/Err/NotFoundPage'
import Layout from './components/Layout'

import AuthLayout from './layouts/authLayout'

import "./assets/styles/global.scss"

const App = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route element={ <Layout /> }>
                    <Route path='/' element={<InfoPage />} />
                </Route>
                <Route path='/api/auth' element={<AuthPage />} />
                <Route path='*' element={ <NotFoundPage /> } />
                <Route  path='/auth' element={ <AuthLayout /> }>
                    <Route path='/sing-in' element={ < /> } />
                    <Route path='/sing-up' element={ < /> } />
                </Route>
            </Routes>
        </div>
    )
}

export default App