import React from "react";
import styles from "./componentRecoverPassword.module.css";
import BackButton from "../backButton/backButton";

import { FaEnvelope } from "react-icons/fa"; // Importa los iconos que necesitas

const componentRecoverPassword = () => {
  return (
    <>
      <div className={styles.buttonBack}>
        <BackButton />
      </div>

      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.inputContainer}>
            <FaEnvelope className={styles.icon} />
            <input
              placeholder="Digita tu correo"
              type="email"
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.button}>
            Recuperar
          </button>
        </form>
      </div>
    </>
  );
};

export default componentRecoverPassword;
