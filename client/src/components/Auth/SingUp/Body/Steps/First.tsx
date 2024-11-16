import { ChangeEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setProfession } from '@/store/slices/authSlice'
import { professionConfig } from '@/config/config.auth'

import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const FirsStep = ({ t, stepPath }: RecoveryStepProps) => {
    const profession = useSelector((state: State) => state.auth.profession)
    const dispatch = useDispatch()

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(setProfession(event.target.value))
    }

    return (
        <>
            <FormControl className="form-control">
                <RadioGroup
                    className="flex flex-col gap-[10px] ml-[10px]"
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={profession}
                    name="radio-buttons-group"
                    onChange={handleRadioChange}
                    sx={{
                        '& .MuiFormControlLabel-root': {
                            color: 'var(--auth-button-text)',
                            borderColor: 'var(--auth-checkbox-main-color)',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderRadius: 'var(--border-radius)',

                            '& .MuiRadio-root': {
                                'color': 'var(--auth-checkbox-main-color)',

                                '&.Mui-checked': {
                                    color: 'var(--auth-checkbox-checked-color)',
                                },
                            },
                        },
                    }}
                >   
                    {
                        professionConfig.map(
                            (item: string, index: number) => (
                                <FormControlLabel
                                    key={index}
                                    value={item}
                                    label={t(`${stepPath}.${index}`)}
                                    control={
                                        <Radio />
                                    }  
                                />
                            )
                        )
                    }
                </RadioGroup>
            </FormControl>
        </>
    )
}

export default FirsStep
