import React, { useState, useEffect } from "react";
import style from "./componentRegister.module.css";
import BackButton from "../backButton/backButton";

const ComponentRegister = () => {
  const [input, setInput] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const isValidEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmitInputs = (event) => {
    event.preventDefault();

    if (!isValidEmail(input.email)) {
      setError("Ingresa un correo válido");
     
      setTimeout(() => {
        setError("");
      }, 4000); 
    } else {
      setError("");
      setInput({
        displayName: "",
        email: "",
        password: "", 
        phoneNumber: "",
      });

      console.log("Registro exitoso");
    }
  };

  return (
    <>
    <div className={style.bodyContainer}>
        <BackButton />
      </div>
    <div className={style.container}>
      
      <label className={style.labelTitle}>Regístrate</label>
      <form className={style.form}>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            name="displayName"
            type="text"
            placeholder="Nombre Completo"
            onChange={handleChangeInput}
            value={input.displayName}
            required
          />
        </div>

        <div className={style.inputContainer}>
          <input
            className={style.input}
            name="email"
            type="email"
            placeholder="Correo"
            onChange={handleChangeInput}
            value={input.email}
          />
        </div>
        <div className={style.inputContainer}>
          <input
            className={style.input}
            name="password" // Cambié el nombre del campo
            type="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleChangeInput}
            value={input.password}
            required
          />
        </div>
        <div className={style.diverror}>
          {error ? <label className={style.errorLabel}>{error}</label> : null}
        </div>

        <div className={style.inputContainer}>
          <input
            className={style.input}
            name="phoneNumber"
            type="Number"
            placeholder="Celular"
            onChange={handleChangeInput}
            value={input.phoneNumber}
          />
        </div>
        <div className={style.inputContainer}>
          <button className={style.button} onClick={onSubmitInputs}>
            Registrar
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default ComponentRegister;
