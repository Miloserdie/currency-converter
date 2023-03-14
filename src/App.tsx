import Header from './components/Header/index'
import Currencies from "./components/Currencies";
import './App.scss';

const App = () => {

    return (
        <div className={'wrapper'}>
            <Header/>
            <main>
                <Currencies />
            </main>
        </div>
    )
}

export default App;
