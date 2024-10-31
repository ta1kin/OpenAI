
import { useSelector, useDispatch } from "react-redux"

import { toggleTheme } from "../store/slices/settingsSlice"


interface RootState {
    navDrawer: NavDrawerInitialState
  }

const InfoPage = () => {
    const theme = useSelector( ( state:RootState ) => state.settings.theme )

    const dispatch = useDispatch()

    return (
        <>
            <div>{ theme }</div>
            <div>
                <button onClick={ () => dispatch( toggleTheme() ) } ></button>
            </div>
        </>
    )
}

export default InfoPage