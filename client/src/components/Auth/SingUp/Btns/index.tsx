import { useTranslation } from "react-i18next"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { State } from "@/types/redux"
import { nextStep, prevStep } from "@/store/slices/singUpSlice"

import Button from "@mui/material/Button"


const SingUpBtns = () => {
    const { t } = useTranslation(['singUp'])
    const state = useSelector( ( state: State ) => state.singUp )

    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <>
            <div className="btns__content w-full flex flex-col gap-[10px]">
                {
                    state.step === state.maxStep
                        ?
                    <Button variant="contained"
                            className="w-full"
                            onClick={ () => navigate('../auth/sing-in') }
                    >
                        { t( `singUp:btns.last` ) }
                    </Button>
                        :
                    <Button variant="contained"
                            className="w-full"
                            onClick={ () => dispatch( nextStep() ) } 
                    >
                        { t( `singUp:btns.next` ) }
                    </Button>
                }
                { 
                    state.step !== state.maxStep
                        && 
                    <Button variant="outlined"
                            className="w-full"
                            onClick={ () => dispatch( prevStep() ) }
                    >
                        { t( `singUp:btns.prev` ) }
                    </Button> 
                }
            </div>
        </>
    )
}

export default SingUpBtns