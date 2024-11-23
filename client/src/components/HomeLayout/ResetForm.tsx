import { useState, ChangeEvent, MouseEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleReset, setPersonalInfo } from '@/store/slices/homeSlice'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

import type { ResetFormProps } from '@/types/types.home'
import type { State } from '@/types/redux'

type ResetFormProps = typeof ResetFormProps
type State = typeof State


const ResetForm = ({inputText, btnText, targetFunc}: ResetFormProps) => {
    const dispatch = useDispatch()
    const {email, accessToken, personalInfo} = useSelector(
        ( state: State ) => (
            {
                email: state.auth.email,
                accessToken: state.auth.accessToken,
                personalInfo: state.home.personalInfo,
            }
        )
    )

    const [ value, setValue ] = useState('')

    const handleInput = ( event: ChangeEvent<HTMLInputElement> ) => {
        const newVal = event.target.value
        setValue( newVal )
    }
    const handleBtn = async ( _event: MouseEvent<HTMLButtonElement> ) => {
        const data: { [key: string]: string } = {
            email: email,
            accessToken: accessToken,
        }
        data[ targetFunc.key ] = value
        await dispatch( targetFunc.func( data ) )

        if( targetFunc.key !== 'password' ) {
            const newPersInfo = { ...personalInfo }
            newPersInfo[ targetFunc.key ] = value
            dispatch(setPersonalInfo(newPersInfo))
        }

        dispatch(toggleReset())
    }
 
    return (
        <>
            <div className="home-layout__reset box">
                <Box className="w-[40%] max-lg:w-[60%] max-sm:w-full flex flex-col gap-[20px]">
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-password">{ inputText }</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="text"
                            value={ value }
                            onChange={ handleInput }
                            label={ inputText }
                        />
                    </FormControl>
                    <Button 
                        className="btn w-full"
                        variant="contained"
                        onClick={ handleBtn }
                    >
                        { btnText }
                    </Button>
                </Box>
            </div>
        </>
    )
}

export default ResetForm
