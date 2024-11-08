import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button'


const NotFoundContent = () => {
    const { t } = useTranslation([ 'notFound' ])

    return (
        <>
            <div className="not-found-content w-full flex justify-center items-center">
                <div className="not-found-page__info">
                    <div className="info__text flex items-center flex-col sm:flex-row">
                        <strong className="text-3xl">404 |</strong> 
                        <p className="ml-[10px] text-3xl">{ t( 'notFound:text.main' ) }</p>
                    </div>
                    <div className="info__widget mt-[15px]">
                        <Link to="/" className="mt-[20px]">
                            <Button variant="contained" className="w-full sm:w-[180px]">{ t( 'notFound:text.btn' ) }</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFoundContent
