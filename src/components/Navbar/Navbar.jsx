


import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { RESET_STATE } from "../../Redux/ActionsTypes";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, getUserProfileByEmail } from "../../Redux/Actions";


const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userByemail = useSelector((state)=>state.UserProfileByEmail)

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const dateUser = auth.currentUser;
  const userEmail = dateUser?.email ??"";

useEffect(() => {
  dispatch(getUserProfile());
}, [userEmail]);

useEffect(() => {
  dispatch(getUserProfileByEmail(userEmail));
}, [userEmail]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch({
        type:RESET_STATE,
       
       })
      navigate("/"); 
   
      
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <div className={styles.navcontainer}>
      <Link to="/">
        <img
          src="https://e7.pngegg.com/pngimages/559/658/png-clipart-catholic-church-catholicism-priest-plan-intarsia-cross-with-praying-hands-logo-signage.png"
          alt="logoiglesiacatolica"
        />
      </Link>
      <div
        className={`${styles.menuicono} ${showMenu ? styles.active : ""}`}
        onClick={toggleMenu}
      >
        <FaBars />
      </div>
      <div
        className={`${styles.linkcontainer} ${showMenu ? styles.active : ""}`}
      >
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>
        {!userEmail ? (
          <Link to="/login" onClick={closeMenu}>
            Inicia Sesión
          </Link>
        ) : (
          <Link to="/" onClick={() => { closeMenu(); handleLogout(); }}>
            Cerrar Sesión
          </Link>
        )}
         {!userEmail? (
          <Link to="/register" onClick={() => { closeMenu()}}>
          Regístrate
        </Link>
        ) :""}
        
        {userByemail.admin ==="Administrador" && userEmail? (
          <Link to="/homeadmin" onClick={() => { closeMenu()}}>
          Administrador
        </Link>
        ) : ""}
         {userEmail? (
          <Link to="/profile" onClick={() => { closeMenu()}}>
          Perfil
        </Link>
        ) :""}
      </div>
    </div>
  );
};

export default Navbar;
