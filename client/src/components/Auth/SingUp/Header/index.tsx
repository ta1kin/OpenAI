import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"

import type { HeaderPropsState } from "@/types/auth/sing-up"
import type { State } from "@/types/redux"


const SingUpHeader = ( { path }: HeaderPropsState ) => {
    const { t } = useTranslation(['singUp'])
    const email = useSelector( ( state: State ) => state.auth.email )

    return (
        <>  
            <div className="header__content">
                <p className="description">{ t( `${path}.header.description` ) }</p>
                <h2 className="title"
                    dangerouslySetInnerHTML={{ __html: t(`${path}.header.title`)
                        .replace('{email}', `<span>${email}</span>`) }} 
                />
            </div>
        </>
    )
}

export default SingUpHeader