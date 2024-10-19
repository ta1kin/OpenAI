import { useState } from "react"

import AuthLogContent from "./AuthLogContent"
import AuthRegContent from "./AuthRegContent"


const AuthForm = () => {
    const [isActive, setActive] = useState( false )
    const [isLokType, setLokType] = useState( true )

    const [email, setEmail] = useState( '' )
    const [password, setPassword] = useState( '' )

    const setActiveClass = () => {
        setActive( prevValue => !prevValue )
    }

    const setLokClass = () => {
        setLokType( prevValue => !prevValue )
    }

    const handleChangeEmail = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setEmail( event.target?.value )
    }

    const handleChangePassword = ( event: React.ChangeEvent<HTMLInputElement> ) => {
        setPassword( event.target?.value )
    }

    return (
        <>
            <div className="auth-page__content">
                <div className={`conteiner ${ isActive ? 'active' : '' }`}>
                    <div className="curved-shape"></div>
                    <div className="curved-shape2"></div>
                    <AuthLogContent isActive={isActive} 
                                    setActiveClass={setActiveClass} 
                                    isLokType={isLokType} 
                                    setLokClass={setLokClass}
                                    email={email}
                                    handleChangeEmail={handleChangeEmail}
                                    password={password}
                                    handleChangePassword={handleChangePassword} />
                    <AuthRegContent isActive={isActive} 
                                    setActiveClass={setActiveClass} 
                                    isLokType={isLokType} 
                                    setLokClass={setLokClass}
                                    email={email}
                                    handleChangeEmail={handleChangeEmail}
                                    password={password}
                                    handleChangePassword={handleChangePassword} />
                </div>
            </div>
        </>
    )
}

export default AuthForm