import { useTranslation } from 'react-i18next'

import HatSvg from '@/assets/icons/Hat.svg'
import GitSvg from '@/assets/icons/git.svg'
import VkSvg from '@/assets/icons/vk.svg'
import TgSvg from '@/assets/icons/telegram.svg'


const InfoFooter = () => {
    const i18nPath = 'info'
    const baseHeadPath = `${i18nPath}:footer`
    const { t } = useTranslation([ i18nPath ])

    return (
        <>
            <footer className="info__footer box">
                <div className="w-full flex flex-row justify-between">
                    <div  className="flex flex-row items-center gap-[15px]">
                        <img src={ HatSvg } alt="hat-logo" />
                        <h2 className="title">{ t(`${baseHeadPath}.title`) }</h2>
                    </div>
                    <nav className="flex items-center flex justify-center gap-[20px]">
                        <button>
                            <img src={VkSvg} alt="vk-logo" />
                        </button>
                        <button>
                            <img src={GitSvg} alt="git-logo" />
                        </button>
                        <button>
                            <img src={TgSvg} alt="tg-logo" />
                        </button>
                    </nav>
                </div>
                <div className="w-full h-[40px] mt-[10px] mb-[20px] flex justify-center">
                    <p className="footer__paragraph flex flex-row gap-[5px]">
                        <p dangerouslySetInnerHTML={{__html: '&copy;'}} />
                        { t(`${baseHeadPath}.description`) }
                    </p>
                </div>
            </footer>
        </>
    )
}

export default InfoFooter