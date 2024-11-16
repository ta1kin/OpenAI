import { useSelector, useDispatch } from 'react-redux'
import { setEmail } from '@/store/slices/authSlice'

import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import EmailIcon from '@mui/icons-material/Email'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const FirsStep = ({ t, stepPath }: RecoveryStepProps) => {
    const email = useSelector( (state: State) => state.auth.email )
    const dispatch = useDispatch()

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${stepPath}.email`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        value={email}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <EmailIcon />
                            </InputAdornment>
                        }
                        label="email"
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default FirsStep
