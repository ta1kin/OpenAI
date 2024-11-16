import { useState, ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEmail, setPassword } from '@/store/slices/authSlice'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const ThirdStep = ({ t, stepPath }: RecoveryStepProps) => {
    const email = useSelector((state: State) => state.auth.email )

    const dispatch = useDispatch()

    const [ input, setInput ] = useState(
        {
            pass: '',
            repass: '',
            showPass: false,
            showRepass: false
        }
    )
    
    const handleClickShowPass = () => setInput({ ...input, showPass: !input.showPass })
    const handleClickShowRePass = () => setInput({ ...input, showRepass: !input.showRepass })

    const handleMouseDownPassword = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }
    const handleMouseUpPassword = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }

    const handleInputEmail = ( event: ChangeEvent<HTMLInputElement> ) => {
        dispatch(setEmail(event.target.value))
    }
    const handleInputPass = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInput({ ...input, pass: event.target.value })
        if( input.pass === input.repass ) {
            dispatch( setPassword( input.pass ) )
        } else {
            dispatch( setPassword( '' ) )
        }
    }
    const handleInputRepass = ( event: ChangeEvent<HTMLInputElement> ) => {
        setInput({ ...input, repass: event.target.value })
        if( input.pass === input.repass ) {
            dispatch( setPassword( input.repass ) )
        } else {
            dispatch( setPassword( '' ) )
        }
    }

    return (
        <>  
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
            <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${stepPath}.email`) }</InputLabel>
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
                        label={t(`${stepPath}.email`)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${stepPath}.pass`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={input.showPass ? 'text' : 'password'}
                        value={input.pass}
                        onChange={handleInputPass}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        input.showPass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {input.showPass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t(`${stepPath}.pass`)}
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{t(`${stepPath}.repass`)}</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={input.showRepass ? 'text' : 'password'}
                        value={input.repass}
                        onChange={handleInputRepass}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        input.showRepass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowRePass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {input.showRepass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={t(`${stepPath}.repass`)}
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default ThirdStep