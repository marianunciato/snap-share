import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './screens/mainPage/MainPage'
import AccessCode from './screens/accessCode/AccessCode';
import AddPhotoshoot from './screens/addPhotoshoot/AddPhotoshoot';
import './App.css';

function App() {
    return (
        <>
            <Router>
                <div className="App flex">
                    <Routes>
                    <Route path="/accesscode/:id" element={<AccessCode isClient={true}/>}/>
                    <Route path="/mainpage" element={<MainPage/>}/>
                    <Route path="/addphotoshoot" element={<AddPhotoshoot/>}/>   
                    </Routes>                        
                </div>
            </Router>
        </>
    );
}


export default App;
