import { useState, MouseEvent, ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setEmail, setPassword, setSaveMe } from '@/store/slices/authSlice'
import { RouterPathes } from '@/config/config.router'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@/components/UI/CheckBox'

import type { BodyProps } from '@/types/types.auth'
import type { State } from '@/types/redux'


type BodyProps = typeof BodyProps
type State = typeof State

const SingInBody = ({ i18nPath, baseBodyPath }: BodyProps) => {
    const { t } = useTranslation([ i18nPath ])
    const dispatch = useDispatch()

    const { email, password, saveMe } = useSelector((state: State) => ({
        email: state.auth.email,
        password: state.auth.password,
        saveMe: state.auth.saveMe
    }))

    const handleInputEmail = ( event: ChangeEvent<HTMLInputElement> ) => {
        dispatch(setEmail(event.target.value))
    }

    const handleInputPass = ( event: ChangeEvent<HTMLInputElement> ) => {
        dispatch(setPassword(event.target.value))
    }

    const [ showPass, setShowPass ] = useState( false )

    const handleClickShowPass = () => setShowPass( show => !show )

    const handleMouseDownPassword = ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }
    const handleMouseUpPassword = ( event: MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }
    const handleChange = ( checked: boolean, id: number ) => {
        dispatch( setSaveMe( checked ) )
        console.log( id )
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${baseBodyPath}.email`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        value={email}
                        onChange={handleInputEmail}
                        endAdornment={
                            <InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        label={ t(`${baseBodyPath}.email`) }
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${baseBodyPath}.pass`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPass ? 'text' : 'password'}
                        value={password}
                        onChange={handleInputPass}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={ t(`${baseBodyPath}.pass`) }
                    />
                </FormControl>
                <div className="flex justify-between items-center">
                    <FormControlLabel 
                        control={
                            <Checkbox
                                id={0}
                                checked={saveMe}
                                onChange={handleChange}
                            />
                        } 
                        label={t(`${baseBodyPath}.saveMe`)} 
                    />
                    <Link to={`${RouterPathes.Recovery}`}>{ t(`${baseBodyPath}.recoveryPass`) }</Link>
                </div>
            </Box>
        </>
    )
}

export default SingInBody
