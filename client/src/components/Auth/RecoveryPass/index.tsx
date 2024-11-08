import RecoveryHeader from "./Header"
import RecoveryBody from "./Body"
import RecoveryBtns from "./Btns"


const RecoveryPass = () => {
    return (
        <>
            <div className="recovery-pass__conteiner  w-full flex flex-col gap-[15px]">
                <div className="conteiner__header w-full">
                    <RecoveryHeader />
                </div>
                <div className="conteiner__body w-full">
                    <RecoveryBody />
                </div>
                <div className="conteiner__btns w-full">
                    <RecoveryBtns />
                </div>
            </div>
        </>
    )
}

export default RecoveryPass