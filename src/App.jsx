import './App.css';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './views/home/home.jsx';
import Login from './views/login/login.jsx';
import Register from './views/register/register.jsx';
import RecoverPassword from './views/recoverPassword/recoverPassword.jsx';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />} />
          <Route path='/passwordrecover' element={<RecoverPassword />}/>
        </Routes>
      </>
    </Router>
  );
}

export default App;

