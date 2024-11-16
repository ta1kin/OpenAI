import { useSelector, useDispatch } from 'react-redux'
import { setCode } from '@/store/slices/recoveryPassSlice'

import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const SecondStep = ({ t, stepPath }: RecoveryStepProps) => {
    const code = useSelector( (state: State) => state.recoveryPass.code )
    const dispatch = useDispatch()

    return (
        <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column' }}>
                <FormControl sx={{ m: 1 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">{ t(`${stepPath}.code`) }</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type="text"
                        value={code}
                        onChange={(e) => dispatch(setCode(e.target.value))}
                        endAdornment={
                            <InputAdornment position="end">
                                <ErrorOutlineIcon />
                            </InputAdornment>
                        }
                        label="code"
                    />
                </FormControl>
            </Box>
        </>
    )
}

export default SecondStep
