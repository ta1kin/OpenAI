import { useTranslation } from 'react-i18next'

import HomeContent from '@Components/Home/'


const HomePage = () => {
    const { t } = useTranslation([ 'home' ])

    document.title = t('home:title')
    return (
        <>
            <div  className="home-page">
                <HomeContent />
            </div>
        </>
    )
}

export default HomePage