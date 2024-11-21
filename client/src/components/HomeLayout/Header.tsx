import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'
import { setLng, toggleTheme } from '@/store/slices/settingsSlice'

import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import ThemeSwitch from '@/components/UI/ThemeSwitch'

import ManSvg from '@/assets/icons/Man.svg'

import type { State } from '@/types/redux'
import type { HeaderRouting } from '@/types/types.home'

type State = typeof State
type HeaderRouting = typeof HeaderRouting


const HomeHeader = () => {
    const i18nPath = 'homeLayout'
    const baseHeadPath = `${i18nPath}:header`
    const { t, i18n } = useTranslation([ i18nPath ])

    const dispatch =  useDispatch()
    const location = useLocation()

    const regex = /\/(\d+)/
    const modifyLocation = location.pathname.replace(regex, '/:id')

    let locationObject: HeaderRouting = {}

    locationObject[ RouterPathes.Home ] = { to: RouterPathes.Docs, text: t(`${baseHeadPath}.toDocs`) }
    locationObject[ RouterPathes.Docs ] = { to: RouterPathes.Home, text: t(`${baseHeadPath}.toProfile`) }
    locationObject[ RouterPathes.Book ] = { to:RouterPathes.Docs, text: t(`${baseHeadPath}.toDocs`)}

    const toItem = locationObject[ modifyLocation ]

    const { email, lng } = useSelector(
        ( state: State ) => (
            {
                email: state.auth.email,
                lng: state.settings.lng,
            }
        )
    )

    const handleRu = () => {
        dispatch(setLng('ru'))
        i18n.changeLanguage('ru')
    }
    const handleEn = () => {
        dispatch(setLng('en'))
        i18n.changeLanguage('en')
    }

    const handleTheme = () => {
        dispatch(toggleTheme())
    }

    const isRuLng = lng === 'ru'
    const isEnLng = lng === 'en'

    return (
        <>
            <div className="home-layout__header box">
                <div className="w-full flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center gap-4">
                        <img className="person-img" src={ManSvg} alt="" />
                        <h2 className="description">{email}</h2>
                    </div>
                    <div className="flex flex-row items-center gap-10">
                        <FormControlLabel control={<ThemeSwitch />} onClick={handleTheme}  label={t(`${baseHeadPath}.theme`)} />
                        <div className="flex flex-row items-center gap-2">
                            <span className={ `select-lang ${isRuLng ? 'is-active' : ''}` } onClick={handleRu}>ru</span>
                            <span className={ `select-lang ${isEnLng ? 'is-active' : ''}` } onClick={handleEn}>en</span>
                        </div>
                        <Link to={toItem.to} className="w-[220px]">
                            <Button variant="contained" className="btn w-full">
                                { toItem.text }
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeHeader