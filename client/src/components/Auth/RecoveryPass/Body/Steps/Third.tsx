import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'


import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const ThirdStep = ({ t, stepPath }: RecoveryStepProps) => {
    const email = useSelector( (state: State) => state.auth.email )
    const dispatch = useDispatch()

    const [ showPass, setShowPass ] = useState( false )
    const [ showRepass, setShowRepass ] = useState( false )

    const handleClickShowPass = () => setShowPass( show => !show )
    const handleClickShowRePass = () => setShowRepass( show => !show )

    const handleMouseDownPassword = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }
    const handleMouseUpPassword = ( event: React.MouseEvent<HTMLButtonElement> ) => {
        event.preventDefault()
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t( `${stepPath}.pass` ) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPass ? 'text' : 'password'}
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
                        label="pass"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '53ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t( `${stepPath}.repass` ) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showRepass ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showRepass ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowRePass}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge="end"
                                >
                                    {showRepass ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="repass"
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default ThirdStep
