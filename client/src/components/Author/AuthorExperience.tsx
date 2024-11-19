import PointSvg from '@/assets/icons/point.svg'

import type { AuthorProps } from '@/types/types.author'

type AuthorProps = typeof AuthorProps


const AuthorExperience = ({ t, basePath }: AuthorProps) => {
    const itemsList: string[] = t(`${basePath}.skills`, { returnObjects: true })

    return (
        <>
            <div className="content__experience">
                <h2 className="min-headline">{ t(`${basePath}.title`) }</h2>
                <div className="block__items mt-[15px]">
                    <ul>
                        {
                            itemsList.map(
                                (item, index) => (
                                    <li key={index} className="flex flex-row items-center gap-[5px]">
                                        <img src={PointSvg} alt="point-svg" />
                                        <p>{ item }</p>
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