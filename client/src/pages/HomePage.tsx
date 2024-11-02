import { useTranslation } from 'react-i18next'


const HomePage = () => {
    const { t } = useTranslation([ 'home' ])

    document.title = t('home:title')
    return (
        <>
            <div  className="home-page">
                home
            </div>
        </>
    )
}

export default HomePage