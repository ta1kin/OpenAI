import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import ruAuthor from './ru/author.json'
import ruDoc from './ru/doc.json'
import ruError from './ru/error.json'
import ruHome from './ru/home.json'
import ruInfo from './ru/info.json'
import ruNotFound from './ru/not-found.json'
import ruSingIn from './ru/sing-in.json'
import ruSingUp from './ru/sing-up.json'
import ruAuth from './ru/auth.json'

import enAuthor from './en/author.json'
import enDoc from './en/doc.json'
import enError from './en/error.json'
import enHome from './en/home.json'
import enInfo from './en/info.json'
import enNotFound from './en/not-found.json'
import enSingIn from './en/singIn.json'
import enSingUp from './en/singUp.json'
import enAuth from './en/auth.json'


const resources = {
    ru: {
        auth: ruAuth,
        author: ruAuthor,
        doc: ruDoc,
        error: ruError,
        home: ruHome,
        info: ruInfo,
        notFound: ruNotFound,
        singIn: ruSingIn,
        singUp: ruSingUp
    },
    en: {
        auth: enAuth,
        author: enAuthor,
        doc: enDoc,
        error: enError,
        home: enHome,
        info: enInfo,
        notFound: enNotFound,
        singIn: enSingIn,
        singUp: enSingUp
    }
}

i18n
    .use( initReactI18next )
    .init({
        resources,
        fallbackLng: 'ru',
        interpolation: {
            escapeValue: false
        }
    })

export default i18n