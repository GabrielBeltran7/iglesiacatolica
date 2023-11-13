import React from "react";
import { useNavigate } from "react-router-dom";


const componentHome = () => {
  const navigate = useNavigate()
  const navigateLogin=()=>{
   navigate("/login")
  }
  const navigateRegister=()=>{
navigate("/register")
  }
  return (
    <div>
      <button onClick={navigateLogin}>Iniciar Sesion</button>
      <button onClick={navigateRegister}>Registrate</button>
    </div>
  );
};

export default componentHome;
