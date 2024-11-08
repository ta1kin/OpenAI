import { useTranslation } from 'react-i18next'

import NotFoundContent from '@Components/NotFound/'


const NotFoundPage = () => {
    const { t } = useTranslation([ 'notFound' ])

    document.title = t( 'notFound:title' )
    return (
        <>
            <div className="not-found-page">
                <NotFoundContent />
            </div>
        </>
    )
}

export default NotFoundPage