import BookPDFViewer from './BookPDFViewer'


const BookContent = () => {
    return (
        <>  
            <div className="book-page__content box">
                <div className="w-full flex justify-center items-center">
                    <BookPDFViewer />
                </div>
            </div>
        </>
    )
}

export default BookContent