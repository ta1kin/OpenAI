import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { nextStep, prevStep } from '@/store/slices/recoveryPassSlice'

import Button from '@mui/material/Button'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BtnsProps = typeof BtnsProps
type State = typeof State

const RecoveryBtns = ( { i18nPath, baseBtnsPath }: BtnsProps ) => {
    const { t } = useTranslation([ i18nPath ])
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {step, maxStep } = useSelector( ( state: State ) => ({
        step: state.recoveryPass.step,
        maxStep: state.recoveryPass.maxStep
    }) ) 
    
    const next = () => {
        if( step === maxStep ) {
            navigate('../auth/sing-in')
        } else {
            dispatch(nextStep())
        }
    }
    const prev = () => {
        if( step === 0 || step === maxStep - 1) {
            navigate('../auth/sing-in')
        } else {
            dispatch(prevStep())
        }
    }

    return (
        <>
            <div className="btns__content w-full flex flex-col gap-[10px]">
                <Button variant="contained"
                        className="w-full"
                        onClick={next}
                >
                    { t( `${baseBtnsPath}.${step}.next` ) }
                </Button>
                {
                    step !== maxStep
                        &&
                        <Button variant="outlined"
                                className="w-full"
                                onClick={prev}
                        >
                            { t( `${baseBtnsPath}.${step}.prev` ) }
                        </Button>
                }
            </div>
        </>
    )
}

export default RecoveryBtns
  