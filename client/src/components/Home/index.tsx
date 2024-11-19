import HomePersonal from './HomePersonal'
import HomeSettings from './HomeSettings'
import HomeLoad from './HomeLoad'


const HomeContent = () => {
    const componentList = [
        <HomePersonal />,
        <HomeSettings />,
        <HomeLoad />
    ]

    return (
        <>
            <main>
                <div>
                    <ul>
                        <div></div>
                        <li></li>
                    </ul>
                </div>
                <div>
                    {
                        componentList[1]
                    }
                </div>
            </main>
        </>
    )
}

export default HomeContent