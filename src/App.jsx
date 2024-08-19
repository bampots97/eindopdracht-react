import './App.css'
import Home from "./pages/HomePage/HomePage.jsx";
import {Route, Routes} from 'react-router-dom'
import NavBar from "./component/NavBar/NavBar.jsx";
import GenrePage from "./pages/genrePage/GenrePage.jsx";
import CreatorPage from "./pages/creatorPage/CreatorPage.jsx";

function App() {
    return (
        <div>
            <NavBar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/genres/:genreId" element={<GenrePage/>}/>
                <Route path="/creators/:id" element={<CreatorPage/>}/>

            </Routes>
        </div>
    );
}

export default App;
