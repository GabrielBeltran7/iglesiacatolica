import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./views/home/home.jsx";
import Login from "./views/login/login.jsx";
import Register from "./views/register/register.jsx";
import RecoverPassword from "./views/recoverPassword/recoverPassword.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ComponentProfile from "./components/componentProfile/ComponentProfile.jsx";
import HomeAdmin from "./views/HomeAdmin/HomeAdmin.jsx";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../api/firebase/FirebaseConfig/FirebaseConfig.js";
import { useEffect } from "react";
import { getUserProfileByEmail, getUserProfile } from "./Redux/Actions.js";
import ComponentRegisterOfferings from "./components/componentRegisterOfferings/componentRegisterOfferings.jsx";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const dispatch = useDispatch();
  const userByemail = useSelector((state) => state.UserProfileByEmail);

  const dateUser = auth.currentUser;
  const userEmail = dateUser?.email ?? "";
  useEffect(() => {
    dispatch(getUserProfileByEmail(userEmail));
  }, [userEmail]);


  useEffect(() => {
    dispatch(getUserProfile());
  }, [userEmail]);
  
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        
      } else {
      
      }
    });
  }, []);
  return (
    <Router>
      <>
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/registeroffering/:id"
            element={ <ComponentRegisterOfferings /> }
          />
          <Route path="/profile" element={<ComponentProfile />} />
          <Route path="/passwordrecover" element={<RecoverPassword />} />
          <Route
            path="/homeadmin"
            element={userByemail.admin ==="Administrador"? <HomeAdmin /> : <Home />}
          />
        </Routes>
        <Footer />
      </>
    </Router>
  );
}

export default App;
