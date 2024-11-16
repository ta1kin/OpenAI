import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import type { BtnsProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BtnsProps = typeof BtnsProps
type State = typeof State

const SingInBtns = ({ i18nPath, baseBtnsPath }: BtnsProps) => {
    const { t } = useTranslation([ i18nPath ])
    // const { email, password } = useSelector( ( state: State )  => (state.auth.email, state.auth.password) )

    const navigate = useNavigate()
    

    return (
        <>  
            <div className="btns__content w-full flex flex-col gap-[10px]">
                <Button variant="contained"
                        className="w-full"
                        // onClick={ () => navigate('../auth/sing-in') }
                >
                    <p className="flex flex-row items-center mr-[10px]">
                        <ArrowForwardIcon /> 
                        <span className="-translate-y-[1px]">]</span>
                    </p>
                    { t( `${baseBtnsPath}.next` ) }
                </Button>
                <hr />
                <Button variant="outlined"
                        className="w-full"
                        onClick={ () => navigate('../auth/sing-up') }
                >
                    { t( `${baseBtnsPath}.prev` ) }
                </Button> 
            </div>
        </>
    )
}

export default SingInBtns
    