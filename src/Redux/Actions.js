/* eslint-disable no-unused-vars */
import { GET_ALLUSER, GET_USER_BY_EMAIL} from "./ActionsTypes";
import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import { addDoc, collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import Swal from "sweetalert2";


export const updateProfile = (inputs) => {
  console.log("miercoles", inputs);

  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        nombre: inputs.nombre,
        apellidos: inputs.apellidos,
        fechaNacimiento: inputs.fechaNacimiento,
        fechaAfiliacion: inputs.fechaAfiliacion,
        estatura: inputs.estatura,
        posicion: inputs.posicion,
        disponibilidad: inputs.disponibilidad,
        urquilla: inputs.urquilla,
        email: inputs.email,
       
      };

      // Actualizar el documento con los datos actualizados
      await updateDoc(userDocRef, updatedData);

      Swal.fire({
        icon: 'success',
        title: 'Datos actualizados con éxito',
        timerProgressBar: true,
        timer: 2000,
      });
    } catch (error) {
      console.error('Error al actualizar los datos:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error al actualizar los datos',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};


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
