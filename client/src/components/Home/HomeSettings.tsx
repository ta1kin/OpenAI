import { MouseEvent } from 'react'

import Button from '@mui/material/Button'

import type { State } from '@/types/redux'
import type { HomeState } from '@/types/redux/interfaces/home'
import type { BaseProps } from '@/types/types.components'

type State = typeof State
type HomeState = typeof HomeState
type BaseProps = typeof BaseProps

interface SettingsBlock {
    headline: string
    list: string[]
}

const HomeSettings = ({ t, baseTextPath }: BaseProps) => {
    const settingBlocks: SettingsBlock[] = t(`${baseTextPath}.list`, { returnObjects: true })

    const resetPhone = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log( 'resetPhone' )
    }
    const resetName = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log( 'resetName' )
    }
    const resetNickName = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log( 'resetNickName' )
    }

    const profileFuncList = [
        resetPhone,
        resetName,
        resetNickName,
    ]


    const resetPass = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log( 'resetPass' )
    }

    const securityFuncList = [
        resetPass
    ]

    const mainFuncList = [
        profileFuncList,
        securityFuncList
    ]

    const deleteProfile = (_event: MouseEvent<HTMLButtonElement>) => {
        console.log( 'delete profile' )
    }

    return (
        <>
            <div className="main__settings w-full h-[100%] flex flex-col gap-[15px]">
                {
                    settingBlocks.map(
                        ( elem, i ) => (
                            <div className="settings__block" key={i} >
                                <h2 className="description">{ elem.headline }</h2>
                                <ul className="ml-5 flex flex-col gap-[5px]">
                                    {
                                        elem.list.map(
                                            ( item: string, j: number ) => (
                                                <li key={j}>
                                                    <Button 
                                                        className="icon w-[30%]"
                                                        variant="text"
                                                        onClick={mainFuncList[i][j]}
                                                    >
                                                        { item }
                                                    </Button>
                                                </li>
                                            )
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    )
                }
                <Button 
                    className="btn w-[20%]"
                    variant="contained"
                    onClick={deleteProfile}
                >
                    { t(`${baseTextPath}.delete`) }
                </Button>
            </div>
        </>
    )
}

export default HomeSettings
