import logo from './logo.svg';
import './App.css';
import LoginPage from './comps/Login';
import {BrowserRouter , Routes , Route} from "react-router-dom"
import Register from './comps/Registration';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>}/>
      <Route path='/register' element={<Register/>}/>

    </Routes>
    </BrowserRouter>
  
    
  );
}

export default App;
