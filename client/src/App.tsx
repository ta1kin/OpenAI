import { Routes, Route } from 'react-router-dom'

import InfoPage from './pages/Info/InfoPage'
import AuthPage from './pages/Auth/AuthPage'
import NotFoundPage from './pages/Err/NotFoundPage'
import Layout from './components/Layout'

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
            </Routes>
        </div>
    )
}

export default App