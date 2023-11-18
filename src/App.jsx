import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './views/home/home.jsx';
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import RecoverPassword from './views/recoverPassword/recoverPassword.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import ComponentProfile from './components/componentProfile/ComponentProfile.jsx';
import HomeAdmin from './views/HomeAdmin/HomeAdmin.jsx';
import {getUserProfile} from "../src/Redux/Actions.js"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const dispatch =useDispatch()
useEffect(()=>{
dispatch(getUserProfile())
},[])

  return (
    <Router>
      <>
      <div >
      <Navbar/>
      </div>
    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/passwordrecover' element={<RecoverPassword />}/>
          <Route path='/profile' element={<ComponentProfile />}/>
          <Route path='/homeadmin' element={<HomeAdmin />}/>
        </Routes>
        <Footer/>
        
      </>
    </Router>
  );
}

export default App;

