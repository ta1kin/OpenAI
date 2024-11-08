import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Hat from '@/assets/icons/Hat.svg'
import { State } from '@/types/redux'


const Instruction = () => {
    const { t } = useTranslation([ 'auth' ])
    const state = useSelector( ( state: State ) => state.singUp )

    return (
        <>
            <div className="instruction component-block">
                <div className="instraction__main">
                    <img src={ Hat } alt="hat-logo" />
                    <h2 className="title">{ t('auth:instruction.main_text') }</h2>
                    <p className="description">{ t('auth:instruction.sub_text') }</p>
                </div>
                <div className="instruction__description">
                    {
                        state.step === state.maxStep
                            ?
                        <h2 className="title pre-title">
                            { t('auth:instruction.steps_text.last') }
                        </h2>
                            :
                        <h2 className="title pre-title">
                            { 
                                t('auth:instruction.steps_text.regular')
                                    .replace( '{step_counter}', `${state.maxStep - state.step + 1}` ) 
                            }
                        </h2>
                    }
                </div>
            </div>
        </>
    )
}

export default Instruction