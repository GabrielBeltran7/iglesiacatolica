import React from 'react'

import style from "./backButton.module.css"
import { useNavigate } from 'react-router-dom';

const backButton = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1); // Utiliza la función navigate con -1 para retroceder en el historial
  };
  return (
    <div >
        <button className={style.backButton} onClick={navigateBack}>
        Atrás
      </button>
    </div>
  )
}

export default backButton