import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { nextStep, prevStep } from '@/store/slices/singUpSlice'

import Button from '@mui/material/Button'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BtnsProps = typeof BtnsProps
type State = typeof State

const SingUpBtns = ({ i18nPath, baseBtnsPath }: BtnsProps) => {
    const { t, i18n } = useTranslation( [i18nPath] )
    const { step, maxStep } = useSelector( ( state: State ) => (
        {
            step: state.singUp.step,
            maxStep: state.singUp.maxStep
        }
    ))

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNext = () => {
        if( step === maxStep ) {
            navigate('../auth/sing-in')
        } else {
            dispatch(nextStep())
        }
    } 
    const handlePrev = () => {
        if( step === 0 ) {
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
                        onClick={handleNext}
                >
                    { t( `${baseBtnsPath}.next` ) }
                </Button>
                {
                    i18n.exists(`${baseBtnsPath}.prev`)
                        && 
                        <Button variant="outlined"
                                className="w-full"
                                onClick={handlePrev}
                        >
                            { t( `${baseBtnsPath}.prev` ) }
                        </Button> 
                }
            </div>
        </>
    )
}

export default SingUpBtns