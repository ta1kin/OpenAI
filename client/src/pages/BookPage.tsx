import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

import BookContent from '@Components/Book/'


const BookPage = () => {
    const { t } = useTranslation([ 'book' ])
    const params = useParams()
    const bookId = params.id

    document.title = t([ 'book:title' ])
    return (
        <>
            <div className="book-page">
                <BookContent bookId={ bookId } />
            </div>
        </>
    )
}

export default BookPage