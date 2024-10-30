import { Link } from 'react-router-dom'


const NotFoundPage = () => {
    document.title = 'Упс..'

    return (
        <div className="wrapper__not-found-page">
            <div className="not-found-page__info">
                <p>Ничего не было наёдено! Вернуться</p>
                <Link to="/">главую</Link>
            </div>
        </div>
    )
}

export default NotFoundPage