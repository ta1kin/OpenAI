import { useTranslation } from 'react-i18next'


const SingUpPage = () => {
    const { t } = useTranslation(['singUp'])

    document.title = t( 'singUp:title' )
    
    return (
        <>
            <div className="sing-up-page">
                { t( 'singUp:title' ) }
            </div>
        </>
    )
}

export default SingUpPage