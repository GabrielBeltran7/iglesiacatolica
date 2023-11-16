
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
import { RESET_STATE } from "../../Redux/ActionsTypes";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await auth.signOut();
      dispatch({
        type:RESET_STATE
       })
      navigate("/"); // Redirige a la página de inicio de sesión después de cerrar sesión
      
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const dateUser = auth.currentUser;
  const userEmail = dateUser?.email ?? "";
  console.log("7777777777777777", userEmail);

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
        <Link to="/register" onClick={closeMenu}>
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaBars } from "react-icons/fa";
// import styles from "./Navbar.module.css";
// import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";
// const Navbar = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   const handleLogout = async () => {
//     try {
//       await auth.signOut();
//       navigate("/login"); // Redirige a la página de inicio de sesión después de cerrar sesión
//     } catch (error) {
//       console.error("Error al cerrar sesión:", error);
//     }
//   };



//   const dateUser = auth.currentUser;
//   const userId = dateUser?.uid ?? "";
//   const userEmail = dateUser?.email ?? "";
//   console.log("7777777777777777",userEmail)
//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const closeMenu = () => {
//     setShowMenu(false);
//   };
//   return (
//     <div className={styles.navcontainer}>
//       <Link to="/">
//         <img
//           src="https://e7.pngegg.com/pngimages/559/658/png-clipart-catholic-church-catholicism-priest-plan-intarsia-cross-with-praying-hands-logo-signage.png"
//           alt="logoiglesiacatolica"
//         />
//       </Link>
//       <div
//         className={`${styles.menuicono} ${showMenu ? styles.active : ""}`}
//         onClick={toggleMenu}
//       >
//         <FaBars />
//       </div>
//       <div
//         className={`${styles.linkcontainer} ${showMenu ? styles.active : ""}`}
//       >
//         <Link to="/" onClick={closeMenu}>
//           Inicio
//         </Link>
//         { !userEmail ? <Link to="/login" onClick={closeMenu}>
//             Inicia Sesion
//           </Link> :<Link to="/login" onClick={handleLogout}>
//             cerrar sesion
//           </Link>
//         }

//         <Link to="/register" onClick={closeMenu}>
//           Registrate
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Navbar;
