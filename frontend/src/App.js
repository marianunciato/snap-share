import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './screens/mainPage/MainPage'
import AccessCode from './screens/accessCode/AccessCode';
import AddPhotoshoot from './screens/addPhotoshoot/AddPhotoshoot';
import ModalProfile from './components/modalProfile/ModalProfile';
import './App.css';

function App() {
    return (
        <>
            <Router>
                <div className="App flex">
                    <Routes>
                    <Route path="/accesscode" element={<AccessCode/>}/>
                    <Route path="/mainpage" element={<MainPage/>}/>
                    <Route path="/addphotoshoot" element={<AddPhotoshoot/>}/>   
                    <Route path="/modalprofile" element={<ModalProfile/>}/>
                    </Routes>                        
                </div>
            </Router>
        </>
    );
}


export default App;
