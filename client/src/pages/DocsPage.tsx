import { useTranslation } from 'react-i18next'

import DocsContent from '@Components/Docs/'


const DocPage = () => {
    const { t } = useTranslation([ 'doc' ])

    document.title = t('doc:title')
    return (
        <>
            <div className="doc-page">
                <DocsContent />
            </div>
        </>
    )
}

export default DocPage