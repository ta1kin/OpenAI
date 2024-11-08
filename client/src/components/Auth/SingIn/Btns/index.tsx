import { useTranslation } from "react-i18next"

import Button from "@mui/material/Button"


const SingInBtns = () => {
    const { t } = useTranslation([ 'singIn' ])

    return (
        <>
            <div className="btns__content w-full flex flex-col gap-[10px]">
                <Button variant="contained"
                        className="w-full"
                        // onClick={ () => navigate('../auth/sing-in') }
                >
                    { t( `singUp:btns.last` ) }
                </Button>
                <hr />
                <Button variant="outlined"
                        className="w-full"
                        // onClick={ () => dispatch( prevStep() ) }
                >
                    { t( `singUp:btns.prev` ) }
                </Button> 
            </div>
        </>
    )
}

export default SingInBtns
    