import { useSelector } from 'react-redux'

import DocsNav from './DocsNav'
import DocsList from './DocsList'

import type { PageProps } from '@/types/types.components'
import type { State } from '@/types/redux'
import type { DocsState } from '@/types/redux/interfaces/docs'

type PageProps = typeof PageProps
type State = typeof State
type DocsState = typeof DocsState


const DocsContent = ({i18nPath, t}: PageProps) => {
    const baseNavPath = `${i18nPath}:nav`
    const baseListPath = `${i18nPath}:cardList`

    const itemsList: DocsState = useSelector( (state: State) => state.docs.itemsList )

    return (
        <>
            <main className="docs-page__docs box">
                {
                    itemsList.length
                        ?
                        <div className="w-full flex flex-col gap-[30px]">
                            <div className="docs__select w-full flex justify-center">
                                <DocsNav t={t} baseTextPath={baseNavPath} />
                            </div>
                            <div className="docs__List w-full flex justify-center">
                                <DocsList t={t} baseTextPath={baseListPath} />
                            </div>
                        </div>
                        :
                        <div>
                            <p className="sub-headline">{ t(`${i18nPath}:void`) }</p>
                        </div>
                }
            </main>
        </>
    )
}

export default DocsContent
