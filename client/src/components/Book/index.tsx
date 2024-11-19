import type { BookParams } from '@/types/types.book'

type BookParams = typeof BookParams


const BookContent = ({ bookId }: BookParams) => {
    return (
        <>
            { bookId }
        </>
    )
}

export default BookContent