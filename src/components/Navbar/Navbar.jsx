import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

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
      <div className={`${styles.menuicono} ${showMenu ? styles.active : ""}`} onClick={toggleMenu}>
        <FaBars />
      </div>
      <div className={`${styles.linkcontainer} ${showMenu ? styles.active : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Inicio
        </Link>
        <Link to="/login" onClick={closeMenu}>
          Inicia Sesion
        </Link>
       
        <Link to="/register" onClick={closeMenu}>
          Registrate
        </Link>
      </div>
    </div>
  );
};

export default Navbar;