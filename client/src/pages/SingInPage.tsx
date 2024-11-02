import { useTranslation } from 'react-i18next'

const SingInPage = () => {
    const { t } = useTranslation(['singIn'])

    document.title = t('singIn:title')

    return (
        <>
            <div className="sing-in-page">
                { t('singIn:title') }
            </div>
        </>
    )
}

export default SingInPage