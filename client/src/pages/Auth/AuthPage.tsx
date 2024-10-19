import AuthForm from "./components/AuthForm"

import "./styles/authStyle.scss"


const AuthPage = () => {
    document.title = 'Авторизация'

    return (
        <div className="auth-page box">
            <AuthForm />
        </div>
    )
}

export default AuthPage