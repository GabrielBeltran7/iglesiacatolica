/* eslint-disable no-unused-vars */
import { GET_ALLUSER, GET_USER_BY_EMAIL} from "./ActionsTypes";
import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Swal from "sweetalert2";


export const getUserProfileByEmail = (email) => {
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const querySnapshot = await getDocs(userCollection);

      const userProfileData = [];
      
      querySnapshot.forEach((doc) => {
        const userData = { id: doc.id, ...doc.data() };
        userProfileData.push(userData);
        if (userData.email === email) {
          dispatch({
            type: GET_USER_BY_EMAIL,
            payload: userData,
          });
        }
      });
    
      Swal.fire({
        icon: 'error',
        title: 'Correo no encontrado',
        timerProgressBar: true,
        timer: 3500,
      });

    } catch (error) {
      // Manejar el error
      Swal.fire({
        icon: 'error',
        title: 'Error al obtener los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};




export const postProfile = (user) => {
 console.log("99999999999999999", user)
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

export const getUserProfile = () => {
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const querySnapshot = await getDocs(userCollection);

      const userProfileData = [];
      querySnapshot.forEach((doc) => {
        userProfileData.push({ id: doc.id, ...doc.data() });
      });

      dispatch({
        type: GET_ALLUSER,
        payload: userProfileData,
      });

  
    } catch (error) {
   
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
