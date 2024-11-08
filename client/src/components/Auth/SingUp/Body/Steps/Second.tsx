import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'

const SecondStep = () => {
    return (
        <>
            <FormGroup>
                <FormControlLabel control={<Checkbox  />} label="Label" />
                <FormControlLabel control={<Checkbox />} label="Required" />
                <FormControlLabel control={<Checkbox />} label="Disabled" />
            </FormGroup>
        </>
    )
}

export default SecondStep