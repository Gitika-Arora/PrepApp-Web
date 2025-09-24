import { BrowserRouter } from 'react-router';
import './App.css';
import Routing from './router/routing.jsx';

function App() {

    return (
        <>
            <div className="App">
                <BrowserRouter>
                    <Routing />
                </BrowserRouter>
            </div>
        </>
    )
}

export default App
