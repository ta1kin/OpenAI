import { Outlet } from 'react-router-dom'

import Instruction from '@Components/Auth/Instruction/'


const AuthLayout = () => {
    return (
        <>  
            <div className="layout auth-layout box">
                <Instruction className="component-block" />
                <div className="auth__content component-block">
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default AuthLayout