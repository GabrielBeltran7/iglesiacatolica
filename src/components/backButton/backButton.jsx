import React from 'react'

import style from "./backButton.module.css"
import { useNavigate } from 'react-router-dom';

const backButton = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1); 
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