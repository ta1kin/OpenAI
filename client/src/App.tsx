import { Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import HomeLayout from './layouts/HomeLayout'
import InfoLayout from './layouts/InfoLayout'

import SingInPage from './pages/SingInPage'
import SingUpPage from './pages/SingUpPage'
import NotFoundPage from './pages/NotFoundPage'
import InfoPage from './pages/InfoPage'
import HomePage from './pages/HomePage'
import ErrorPage from './pages/ErrorPage'
import DocPage from './pages/DocPage'
import AuthorPage from './pages/AuthorPage'

import "./assets/styles/global.scss"


const App = () => {
    return (
        <div className="wrapper">
            <Routes>
                {/* <Route element={ <Layout /> }>
                    <Route path='/' element={<InfoPage />} />
                </Route>
                <Route path='/api/auth' element={<AuthPage />} />
                <Route path='*' element={ <NotFoundPage /> } /> */}

                <Route element={  <InfoLayout />} >
                    <Route path='/' element={<InfoPage />} />
                    <Route path='/author' element={<AuthorPage />} />
                </Route>

                <Route path='/auth' element={ <AuthLayout /> }>
                    <Route path='/sing-in' element={ <SingInPage /> } />
                    <Route path='/sing-up' element={ <SingUpPage /> } />
                </Route>

                <Route path='/home' element={ <HomeLayout /> }>
                    <Route path='/' element={ <HomePage /> } />
                    <Route path='/documents' element={ <DocPage /> } />
                </Route>

                <Route path='error' element={ <ErrorPage /> } />
                <Route path='*' element={ <NotFoundPage /> } />
            </Routes>
        </div>
    )
}

export default App