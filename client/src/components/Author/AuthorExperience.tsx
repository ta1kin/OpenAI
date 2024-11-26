import PointSvg from '@/assets/icons/point.svg'

import type { AuthorProps, AuthorScills } from '@/types/types.author'

type AuthorProps = typeof AuthorProps
type AuthorScills = typeof AuthorScills


const AuthorExperience = ({ t, basePath }: AuthorProps) => {
    const itemsList: AuthorScills[] = t(`${basePath}.skills`, { returnObjects: true })

    return (
        <>
            <div className="content__experience">
                <h2 className="min-headline">{ t(`${basePath}.title`) }</h2>
                <div className="block__items mt-[15px]">
                    <ul>
                        {
                            itemsList.map(
                                (block, index) => (
                                    <li key={index} className="mt-[15px] flex flex-col items-start gap-[5px]">
                                        <div className="flex flex-row items-center gap-[5px]">
                                            <img src={PointSvg} alt="point-svg" />
                                            <h2 className="description">{ block.title }:</h2>
                                        </div>
                                        <dl className="ml-[60px]">
                                            {
                                                block.items.map(
                                                    (elem: string, ind: number) => (
                                                        <li key={ind}>{ elem }</li>
                                                    )
                                                )
                                            }
                                        </dl>
                                    </li>
                                )
                            )
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default AuthorExperience