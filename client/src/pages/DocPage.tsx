import { useTranslation } from 'react-i18next'


const DocPage = () => {
    const { t } = useTranslation([ 'doc' ])

    document.title = t('doc:title')
    return (
        <>
            <div className="doc-page">
                doc
            </div>
        </>
    )
}

export default DocPage