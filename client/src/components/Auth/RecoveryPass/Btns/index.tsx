import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { nextStep, prevStep } from '@/store/slices/recoveryPassSlice'
import { verifyEmailAsync, verifyCodeAsync, sendNewPassAsync } from '@/store/slices/recoveryPassSlice'
import { RouterPathes } from '@/config/config.router'

import Button from '@mui/material/Button'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BtnsProps = typeof BtnsProps
type State = typeof State

const RecoveryBtns = ( { i18nPath, baseBtnsPath }: BtnsProps ) => {
    const { t } = useTranslation([ i18nPath ])
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {step, maxStep, code, email, password } = useSelector( ( state: State ) => (
        {
            // recovery
            step: state.recoveryPass.step,
            maxStep: state.recoveryPass.maxStep,
            // auth
            code: state.auth.code,
            email: state.auth.email,
            password: state.auth.password,
        }
    ) )
    
    const handleNext = async () => {
        switch ( step ) {
            case 0: {
                await dispatch( verifyEmailAsync( code ) )
                dispatch( nextStep() )
                break
            }
            case 1: {
                await dispatch( verifyCodeAsync( email ) )
                dispatch( nextStep() )
                break
            }
            case 2: {
                await dispatch( sendNewPassAsync( password ) )
                dispatch( nextStep() )
                break
            }
            case maxStep: {
                navigate( RouterPathes.Login )
                break
            }
            default:  {
                dispatch( nextStep() )
            }
        }
    }
    const handlePrev = () => {
        switch ( step ) {
            case 0 || maxStep - 1: {
                navigate( RouterPathes.Login )
                break
            }
            default:  {
                dispatch( prevStep() )
            }
        }
    }

    return (
        <>
            <div className="btns__content w-full flex flex-col gap-[10px]">
                <Button variant="contained"
                        className="w-full"
                        onClick={handleNext}
                >
                    { t( `${baseBtnsPath}.${step}.next` ) }
                </Button>
                {
                    step !== maxStep
                        &&
                        <Button variant="outlined"
                                className="w-full"
                                onClick={handlePrev}
                        >
                            { t( `${baseBtnsPath}.${step}.prev` ) }
                        </Button>
                }
            </div>
        </>
    )
}

export default RecoveryBtns
  