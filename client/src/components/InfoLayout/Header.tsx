import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import HatSvg from '@/assets/icons/Hat.svg'
import DraftSvg from '@/assets/icons/Draft.svg'


const InfoHeader = () => {
    const i18nPath = 'info'
    const baseHeadPath = `${i18nPath}:header`
    const { t } = useTranslation([ i18nPath ])

    return (
        <>
            <header className="info__header box">
                <div className="w-full mt-[10px] mb-[10px]">
                    <div className="header-top w-full flex flex-row justify-between">
                        <div className="header-top__logo flex flex-row items-center">
                            <div className="logo__img">
                                <img src={ HatSvg } alt="hat-logo" />
                            </div>
                            <div className="logo__text ml-[10px] flex flex-col">
                                <h2 className="title">{ t(`${baseHeadPath}.logo.title`) }</h2>
                                <p className="description">{ t(`${baseHeadPath}.logo.description`) }</p>
                            </div>
                        </div>
                        <nav className="header-top__nav flex flex-row items-center gap-[30px]">
                            <Link to={ RouterPathes.Info } className="nav__link" >{ t(`${baseHeadPath}.nav.first`) }</Link>
                            <Link to={ RouterPathes.Author } className="nav__link" >{ t(`${baseHeadPath}.nav.second`) }</Link>
                        </nav>
                    </div>
                    <div className="header-bottom w-full flex flex-row justify-between">
                        <div className="header-bottom__text w-[40%] flex flex-col justify-center items-start gap-[20px]">
                            <h2 className="header__title w-[80%]">{ t(`${baseHeadPath}.text.headline`) }</h2>
                            <p className="header__paragraph">{ t(`${baseHeadPath}.text.paragraph`) }</p>
                            <Link to={ RouterPathes.Register  } className="w-full">
                                <button>{ t(`${baseHeadPath}.text.button`) }</button>
                            </Link>
                        </div>
                        <div className="header-bottom__img w-[60%] flex flex-col justify-center items-end">
                            <img src={ DraftSvg } alt="draft-info-header" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default InfoHeader