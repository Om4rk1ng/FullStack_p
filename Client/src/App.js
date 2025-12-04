import logo from './logo.svg';
import './App.css';
import LoginPage from './comps/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './comps/Registration';
import Home from './comps/Home';
import History from './comps/History';
import AboutUs from './comps/AboutUs';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/aboutus' element={<AboutUs />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
