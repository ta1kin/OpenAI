import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RouterPathes } from '@/config/config.router'

import Button from '@mui/material/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import type { State } from '@/types/redux'
import type { DocsState, DocsItem } from '@/types/redux/interfaces/docs'
import type { BaseProps } from '@/types/redux/interfaces/docs'

type State = typeof State
type BaseProps = typeof BaseProps
type DocsState = typeof DocsState
type DocsItem = typeof DocsItem


const DocsList = ({t, baseTextPath}: BaseProps) => {
    const fileList: File[] = useSelector( (state: State) => state.docs.fileList )
    const itemsList: DocsState = useSelector( (state: State) => state.docs.itemsList )

    return (
        <>
            <div className="list__block w-full flex flex-col justify-center gap-5">
                {   
                    itemsList.map(
                        ( item: DocsItem ) => (
                            <div key={item.id} className="block__card w-full flex justify-between items-center">
                                <div>
                                    <h2 className="description">{item.headline}</h2>
                                    <div className="card__text flex flex-row items-center gap-2">
                                        <p>{t(`${baseTextPath}.date`)}</p>
                                        <p>{item.date}</p>
                                    </div>
                                </div>
                                <div></div>
                                <div>
                                    <Link to={RouterPathes.Book.replace(':id', item.id )}>
                                        <Button variant="outlined" className="card__btn btn outlined flex justify-between items-center gap-1">
                                            <p>{ t(`${baseTextPath}.btn`) }</p>
                                            <ArrowForwardIcon />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
}

export default DocsList
