import React from "react";
import { useNavigate } from "react-router-dom";
import style from "./componentHome.module.css";
import ComponentCarrousel from "../ComponentCarrousel/componentCarrousel";

const ComponentHome = () => {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateRegister = () => {
    navigate("/register");
  };
  return (
    <div className={style.container}>
      
      <div className={style.containerbutton}>
      <button className={style.button} onClick={navigateLogin}>
        Iniciar Sesión
      </button>
      <button className={style.button} onClick={navigateRegister}>
        Regístrarse
      </button>
       
      </div>
       <label className={style.label}>Semana Santa</label>
      <div className={style.carouselContainer}>
        <ComponentCarrousel />
      </div>
    </div>
  );
};

export default ComponentHome;

