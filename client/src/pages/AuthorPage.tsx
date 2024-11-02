import { useTranslation } from 'react-i18next'


const AuthorPage = () => {
    const { t } = useTranslation([ 'author' ])

    document.title = t([ 'author' ])
    return (
        <>
            <div className="author-page">
                author
            </div>
        </>
    )
}

export default AuthorPage