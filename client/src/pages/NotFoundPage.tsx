import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'


const NotFoundPage = () => {
    const { t } = useTranslation([ 'notFound' ])

    document.title = t( 'notFound:title' )

    return (
        <>
            <div className='not-found-page'>
                <div className="not-found-page__info">
                    <p>Ничего не было наёдено! Вернуться на</p>
                    <Link to="/">главую!</Link>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage