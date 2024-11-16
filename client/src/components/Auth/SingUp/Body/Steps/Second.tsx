import { useSelector, useDispatch } from 'react-redux'
import { setWhoIs } from '@/store/slices/authSlice'

import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@/components/UI/CheckBox'

import type { State } from '@/types/redux'
import type { RecoveryStepProps } from '@/types/types.auth'


type RecoveryStepProps = typeof RecoveryStepProps
type State = typeof State

const SecondStep = ({ t, stepPath }: RecoveryStepProps) => {
    const {profession, whoIs} = useSelector((state: State) => (
        {
            profession: state.auth.profession,
            whoIs: state.auth.whoIs,
        }
    ))

    const dispatch = useDispatch()
    const labels = Object.keys( whoIs )

    const handleChange = ( checked: boolean, key: string ) => {
        dispatch( setWhoIs( { checked, key } ) )
    }
    
    return (
        <>
            <FormGroup className="checkbox-form">
                {
                    labels.map( (item, index) => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    id={item}
                                    checked={whoIs[ item ]}
                                    onChange={handleChange}
                                />
                            }
                            label={t( `${stepPath}.${profession}.${index}` )}
                        />
                    ) )
                }
            </FormGroup>
        </>
    )
}

export default SecondStep
