import SingInHeader from "./Header"
import SingInBody from "./Body"
import SingInBtns from "./Btns"


const SingIn = () => {
    return (
        <>
            <div className="sing-in__conteiner w-full flex flex-col gap-[15px]">
                <div className="conteiner__header w-full">
                    <SingInHeader />
                </div>
                <div className="conteiner__body w-full">
                    <SingInBody />
                </div>
                <div className="conteiner__btns w-full">
                    <SingInBtns />
                </div>
            </div>
        </>
    )
}

export default SingIn