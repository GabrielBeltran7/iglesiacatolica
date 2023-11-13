import React from "react";
import styles from "./componentLogin.module.css";
import {
  FaSignInAlt,
  FaUserPlus,
  FaEnvelope,
  FaLock,
} from "react-icons/fa"; // Importa los iconos que necesitas
import BackButton from "../backButton/backButton";
import { useNavigate } from "react-router-dom";

const ComponentLogin = () => {
  const navigate = useNavigate();

  const navigateRecoverpassword = () => {
    navigate("/passwordrecover");
  };

  const navigateRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div className={styles.bodyContainer}>
        <BackButton />
      </div>
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <FaEnvelope className={styles.icon} />
            <input placeholder="Correo" type="email" className={styles.input} />
          </div>

          <div className={styles.inputContainer}>
            <FaLock className={styles.icon} />
            <input
              placeholder="Contraseña"
              type="password"
              className={styles.input}
            />
          </div>

          <button type="submit" className={styles.button}>
            <FaSignInAlt /> Iniciar Sesión
          </button>

          <button
            type="submit"
            onClick={navigateRegister}
            className={styles.button}
          >
            <FaUserPlus /> Crear Cuenta
          </button>

          <div className={styles.div} onClick={navigateRecoverpassword}>
            <label className={styles.contra}>Olvidaste tu Contraseña? </label>
            <label className={styles.contraRecuperala}> Recupérala!</label>
          </div>
        </form>
      </div>
    </>
  );
};

export default ComponentLogin;
