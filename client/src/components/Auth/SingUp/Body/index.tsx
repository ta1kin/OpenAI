import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import type { BodyPropsState } from "@/types/auth/sing-up"
import type { State } from "@/types/redux"

import FirsStep from "./Steps/First"
import SecondStep from "./Steps/Second"
import ThirdStep from "./Steps/Third"


const SingUpBody = ( { path }: BodyPropsState ) => {
    
    const { t } = useTranslation(['singUp'])
    const state = useSelector( ( state: State ) => state.singUp )

    return (
        <>
            {
                state.step !== 3
                    &&
                <div className="body__content">
                    { state.step === 0 && <FirsStep />   }
                    { state.step === 1 && <SecondStep /> }
                    { state.step === 2 && <ThirdStep />  }
                </div>   
            }
        </>
    )
}

export default SingUpBody