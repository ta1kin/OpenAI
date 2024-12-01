import { ChangeEvent, MouseEvent, useState } from 'react'
import { selectionConfig } from '@/config/config.docs'
import { useDispatch } from 'react-redux'
import { setSearch, setSelect } from '@/store/slices/docsSlice'

import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import SearchIcon from '@mui/icons-material/Search'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'

import type { BaseProps } from '@/types/redux/interfaces/docs'

type BaseProps = typeof BaseProps


const DocsNav = ({t, baseTextPath}: BaseProps) => {
    const dispatch = useDispatch()

    const [ selectors, setSelectors ] = useState(
        {
            select: '',
            search: '',
        }
    )

    const handleChange = (event: SelectChangeEvent) => {
        const newSelect = event.target.value
        setSelectors({ ...selectors, select: newSelect })
    }
    const handleInput = (event: ChangeEvent<HTMLInputElement> ) => {
        const newSearch = event.target.value
        setSelectors({ ...selectors, search: newSearch })
    }
    const handleApplySelection = (_event: MouseEvent<HTMLButtonElement>) => {
        dispatch(setSelect(selectors.select))
        dispatch(setSearch(selectors.search))
    }

    return (
        <>
            <div className="select__block flex flex-row max-lg:flex-col flex-wrap justify-between max-lg:justify-center items-center gap-2 max-lg:gap-5">
                <div className="max-lg:w-full flex flex-row max-md:flex-col justify-between items-center gap-3">
                    <Box>
                        <FormControl>
                            <InputLabel id="demo-simple-select-label">{t(`${baseTextPath}.selection.name`)}</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                className="w-[200px] max-lg:w-[170px] max-md:w-[300px] max-sm:w-[200px]"
                                value={selectors.select}
                                label={t(`${baseTextPath}.selection.name`)}
                                onChange={handleChange}
                            >   
                                {
                                    selectionConfig.map(
                                        (item: string, index: number) => (
                                            <MenuItem key={index} value={item}>{t(`${baseTextPath}.selection.${item}`)}</MenuItem>
                                        )
                                    )
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">{t(`${baseTextPath}.input`)}</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type="text"
                            className="w-[400px] max-xl:w-[350px] max-lg:w-[300px] max-sm:w-[200px]"
                            value={selectors.search}
                            onChange={handleInput}
                            label={t(`${baseTextPath}.input`)}
                        />
                    </FormControl>
                </div>
                <Button 
                    variant="contained"
                    className="btn h-[50px] w-[140px] max-lg:w-[50%] max-md:w-[300px] max-sm:w-[200px]"
                    onClick={handleApplySelection}
                >
                    <p>{t(`${baseTextPath}.btn`)}</p>
                    <SearchIcon className="ml-[5px]" />
                </Button>
            </div>
        </>
    )
}

export default DocsNav