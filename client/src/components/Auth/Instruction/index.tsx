import { useTranslation } from 'react-i18next'

import Hat from '@/assets/icons/Hat.svg'


const Instruction = () => {
    const { t } = useTranslation([ 'auth' ])

    return (
        <>
            <div className="instruction component-block">
                <div className="instraction__main">
                    <img src={ Hat } alt="hat-logo" />
                    <h2 className="title">{ t('auth:instruction.main_text') }</h2>
                    <p className="description">{ t('auth:instruction.sub_text') }</p> //Metsuki sutemi
                </div>
                <div className="instruction__description">
                    <h2 className="title pre-title">{ t('auth:instruction.steps_text.regular').replace( '{step_counter}', '2') }</h2>
                </div>
            </div>
        </>
    )
}

export default Instruction