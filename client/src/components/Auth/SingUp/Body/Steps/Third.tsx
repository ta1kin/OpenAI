import * as React from 'react'

import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import EmailIcon from '@mui/icons-material/Email'


const ThirdStep = () => {

    const [ showPass, setShowPass ] = React.useState( false )
    const [ showRepass, setShowRepass ] = React.useState( false )

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
            <FormControl sx={{ m: 1, width: '53ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        endAdornment={
                            <InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        label="Username"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '53ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
                        label="Password"
                    />
                </FormControl>
                <FormControl sx={{ m: 1, width: '53ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Repass</InputLabel>
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
                        label="Password"
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default ThirdStep