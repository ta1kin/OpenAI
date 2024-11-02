
import { useSelector, useDispatch } from "react-redux"
import { useTranslation } from 'react-i18next'

import { toggleTheme } from "../store/slices/settingsSlice"


const InfoPage = () => {
    const { t } = useTranslation([ 'info' ])
    const theme = useSelector( state => state.settings.theme )

    const dispatch = useDispatch()

    document.title = t('info:title')
    return (
        <>  
            <div className="info-page">
                <div>{ theme }</div>
                <div>
                    <button onClick={ () => dispatch( toggleTheme() ) } ></button>
                </div>
            </div>
        </>
    )
}

export default InfoPage