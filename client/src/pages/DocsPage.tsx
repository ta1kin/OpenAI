import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import DocsContent from '@/components/Docs/'

import type { State } from '@/types/redux'

type State = typeof State


const DocPage = () => {
    const navigate = useNavigate()

    const { t } = useTranslation([ 'doc' ])
    const accessToken = useSelector( (state: State) => state.auth.accessToken )

    useEffect(
        () => {
            if( !accessToken ) {
                navigate( RouterPathes.Login )
            }
        }, 
        [accessToken]
    )

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