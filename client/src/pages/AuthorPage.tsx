import { useTranslation } from 'react-i18next'

import AuthorContent from '@Components/Author/'


const AuthorPage = () => {
    const { t } = useTranslation([ 'author' ])

    document.title = t([ 'author:title' ])
    return (
        <>
            <div className="author-page">
                <AuthorContent />
            </div>
        </>
    )
}

export default AuthorPage