import { Outlet } from 'react-router-dom'

import Instruction from '@Components/Auth/Instruction/'


const AuthLayout = () => {
    return (
        <>  
            <div className="layout auth-layout box">
                <div className="auth__content flex flex-col">
                    <Instruction />
                    <div className="component-block mt-[10px]">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthLayout