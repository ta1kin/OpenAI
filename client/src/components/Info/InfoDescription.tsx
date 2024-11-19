import type { InfoProps, DescriptionListItem, ImgObject } from '@/types/types.info'

import AuthPng from '@/assets/img/auth.png'
import BlockchainPng from '@/assets/img/blockchain.png'

type InfoProps = typeof InfoProps
type DescriptionListItem = typeof DescriptionListItem
type ImgObject = typeof ImgObject


const InfoDescription = ({ t, basePath }: InfoProps) => {
    const itemList: DescriptionListItem[] = t(`${basePath}`, { returnObjects: true })

    const imgObject: ImgObject = {
        auth: AuthPng,
        blockchain: BlockchainPng
    }

    return (
        <>
            <div className="content__description-site w-full flex flex-row justify-between flex-wrap gap-[20px]">
                {
                    itemList.map(
                        ( item, index ) => (
                            <div key={index} className="description-site__block">
                                <div className="w-full flex flex-row items-center gap-[10px]">
                                    <img src={`${imgObject[ item.img ]}`} alt="" />
                                    <h2 className="card-headline">{item.title}</h2>
                                </div>
                                <p className="card-description mt-4">{item.description}</p>
                            </div>
                        )
                    )
                }
            </div>
        </>
    )
}

export default InfoDescription