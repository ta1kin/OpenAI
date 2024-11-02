import { useTranslation } from 'react-i18next'


const ErrorPage = () => {
    const { t } = useTranslation([ 'error' ])

    document.title = t('error:title')
    return (
        <>
            <div  className="error-page">
                err
            </div>
        </>
    )
}

export default ErrorPage