import { useSelector } from "react-redux"

import FirsStep from "./Steps/First"
import SecondStep from "./Steps/Second"
import ThirdStep from "./Steps/Third"
import { State } from "../../../../types/redux"


const RecoveryBody = () => {
    const state = useSelector( ( state: State ) => state.recoveryPass )

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

export default RecoveryBody