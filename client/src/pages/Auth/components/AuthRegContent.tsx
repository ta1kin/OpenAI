import React from 'react';

interface Props {
    isActive: boolean;
    setActiveClass: () => void;
    isLokType: boolean;
    setLokClass: () => void;
    email: string;
    handleChangeEmail: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
    password: string;
    handleChangePassword: ( event: React.ChangeEvent<HTMLInputElement> ) => void;
}

const AuthRegContent: React.FC<Props> = ( { isActive, 
                                            setActiveClass, 
                                            isLokType, 
                                            setLokClass,
                                            email, 
                                            handleChangeEmail, 
                                            password, 
                                            handleChangePassword} ) => {

    return (
        <>
            <div className="form-box Registration">
                <h2 className={ `animation ${ isActive ? 'l-10' : 'd-0' }` }>Регистрация</h2>
                <form>
                    <div className={ `input-box animation ${ isActive ? 'l-11' : 'd-1' }` }>
                        <input type="text" 
                                id="email"
                                value={email}
                                onChange={handleChangeEmail} />
                        <label htmlFor="email">Почта</label>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="form-icon">
                            <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                    </div>
                    <div className={ `input-box animation ${ isActive ? 'l-12' : 'd-2' }` }>
                        <input type={ isLokType ? 'password' : 'text' } 
                                id="password"
                                value={password}
                                onChange={handleChangePassword} />
                        <label htmlFor="password">Пароль</label>
                        {
                            isLokType 
                            ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-btn" onClick={setLokClass}>
                                    <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z"/>
                                </svg>
                            :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-btn" onClick={setLokClass}>
                                    <path d="M352 144c0-44.2 35.8-80 80-80s80 35.8 80 80l0 48c0 17.7 14.3 32 32 32s32-14.3 32-32l0-48C576 64.5 511.5 0 432 0S288 64.5 288 144l0 48L64 192c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-192c0-35.3-28.7-64-64-64l-32 0 0-48z"/>
                                </svg>
                        }
                        
                    </div>
                    <div className={ `reg-link animation ${ isActive ? 'l-13' : 'd-3' }` }>
                        <p >Уже зарегистрированы?</p>
                        <a href="#" className="SingInLink" onClick={ setActiveClass }>Войти</a>
                    </div>
                    <div className={ `input-btn animation ${ isActive ? 'l-14' : 'd-4' }` }>
                        <button>Войти</button>
                    </div>
                </form>
                <div className={ `oauth-form animation ${ isActive ? 'l-15' : 'd-5' }` }>
                    <h3>Зарегистрироваться через</h3>
                    <div className="other-box">
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="tg">
                                <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"/>
                            </svg>
                        </button>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" className="git">
                                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                            </svg>
                        </button>
                        <button >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  className="vk">
                                <path d="M31.5 63.5C0 95 0 145.7 0 247V265C0 366.3 0 417 31.5 448.5C63 480 113.7 480 215 480H233C334.3 480 385 480 416.5 448.5C448 417 448 366.3 448 265V247C448 145.7 448 95 416.5 63.5C385 32 334.3 32 233 32H215C113.7 32 63 32 31.5 63.5zM75.6 168.3H126.7C128.4 253.8 166.1 290 196 297.4V168.3H244.2V242C273.7 238.8 304.6 205.2 315.1 168.3H363.3C359.3 187.4 351.5 205.6 340.2 221.6C328.9 237.6 314.5 251.1 297.7 261.2C316.4 270.5 332.9 283.6 346.1 299.8C359.4 315.9 369 334.6 374.5 354.7H321.4C316.6 337.3 306.6 321.6 292.9 309.8C279.1 297.9 262.2 290.4 244.2 288.1V354.7H238.4C136.3 354.7 78 284.7 75.6 168.3z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="info-content Registration">
                <h2 className={ `animation ${ isActive ? 'l-10' : 'd-0' }` }>Начни путь свой!</h2>
                <p className={ `animation ${ isActive ? 'l-11' : 'd-1' }` }>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor, vero?</p>
            </div>
        </>
    )
}

export default AuthRegContent