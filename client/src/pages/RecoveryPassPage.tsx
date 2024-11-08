import { useTranslation } from "react-i18next"

import RecoveryPassContent from '@Components/Auth/RecoveryPass'


const RecoveryPage = () => {
    const { t } = useTranslation([ 'recoveryPass' ])

    document.title = t( 'recoveryPass:title' )
    return (
        <>
            <div className="recovery-pass-page">
                <RecoveryPassContent />
            </div>
        </>
    )
}

export default RecoveryPage