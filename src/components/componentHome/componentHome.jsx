import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import style from "./componentHome.module.css";
import ComponentCarrousel from "../ComponentCarrousel/componentCarrousel";
import { getUserProfileByEmail } from "../../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../../api/firebase/FirebaseConfig/FirebaseConfig";

const ComponentHome = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userByemail = useSelector((state)=>state.UserProfileByEmail)

  const dateUser = auth.currentUser;
  const userEmail = dateUser?.email ?? "";
  useEffect(() => {
    if (userEmail){
      dispatch(getUserProfileByEmail(userEmail));
    }
    
  }, [userEmail]);

  const navigateLogin = () => {
    navigate("/login");
  };

  const navigateRegister = () => {
    navigate("/register");
  };
  return (
    <div className={style.container}>
      {!userEmail?  <div className={style.containerbutton}>
      <button className={style.button} onClick={navigateLogin}>
        Iniciar Sesión
      </button>
      <button className={style.button} onClick={navigateRegister}>
        Regístrarse
      </button>
       
      </div>:<label className={style.label}>Bienvenidos</label>
      }
     
       <label className={style.label}>Semana Santa</label>
      <div className={style.carouselContainer}>
        <ComponentCarrousel />
      </div>
    </div>
  );
};

export default ComponentHome;

