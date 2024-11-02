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


const App = () => {
    return (
        <div className="wrapper">
            <Routes>
                <Route element={  <InfoLayout />} >
                    <Route path='/' element={<InfoPage />} />
                    <Route path='/author' element={<AuthorPage />} />
                </Route>

                <Route element={ <AuthLayout /> }>
                    <Route path='/auth/sing-in' element={ <SingInPage /> } />
                    <Route path='/auth/sing-up' element={ <SingUpPage /> } />
                </Route>

                <Route element={ <HomeLayout /> }>
                    <Route path='/home' element={ <HomePage /> } />
                    <Route path='/home/documents' element={ <DocPage /> } />
                </Route>

                <Route path='error' element={ <ErrorPage /> } />
                <Route path='*' element={ <NotFoundPage /> } />
            </Routes>
        </div>
    )
}

export default App