/* eslint-disable no-unused-vars */
import { GET_SERVICIOS } from "./ActionsTypes";
import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import { addDoc, collection } from 'firebase/firestore';
import Swal from "sweetalert2";


export const postProfile = (user) => {
  console.log("999999999999999", user)
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const newDocRef = await addDoc(userCollection, user);
      Swal.fire({
        icon: 'success',
        title: 'datos registrados con exito',
        timerProgressBar: true,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar Los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};









































export const getServicios = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: GET_SERVICIOS,
        payload: servicios,
      });
    } catch (error) {
      throw error;
    }
  };
};
