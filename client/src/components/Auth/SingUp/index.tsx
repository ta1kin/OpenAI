import { useSelector } from "react-redux"

import type { State } from "@/types/redux"

import SingUpHeader from "./Header"
import SingUpBody from "./Body"
import SingUpBtns from "./Btns"


const SingUp = () => {
    const step = useSelector( ( state: State ) => state.singUp.step )

    const path = `singUp:content.${step}`

    return (
        <>
            <div className="sing-up__conteiner w-full flex flex-col gap-[15px]">
                <div className="conteiner__header w-full">
                    <SingUpHeader path={ path } />
                </div>
                <div className="conteiner__body w-full">
                    <SingUpBody path={ path } />
                </div>
                <div className="conteiner__btns w-full">
                    <SingUpBtns />
                </div>
            </div>
        </>
    )
}

export default SingUp