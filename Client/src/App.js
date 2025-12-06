
import './App.css';
import LoginPage from './comps/Login';
import { BrowserRouter, Routes, Route,Link } from "react-router-dom"
import Register from './comps/Register.js';
import Home from './comps/Home';
import History from './comps/History';
import AboutUs from './comps/AboutUs';
import Profile from './comps/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import ForgotPass from './comps/forgetpwd.js';




function App() {
  return (
  
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/register' element={<Register/>} />
        <Route path='/home' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/aboutus' element={<AboutUs />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
      </Routes>
    </BrowserRouter>


  );
}

export default App;
