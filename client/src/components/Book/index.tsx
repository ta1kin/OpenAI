import type { BookParams } from "@/types/book"


const BookContent = ({ bookId }: BookParams) => {
    return (
        <>
            { bookId }
        </>
    )
}

export default BookContent