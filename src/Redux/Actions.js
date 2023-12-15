/* eslint-disable no-unused-vars */
import { GET_ALLUSER, GET_USER_BY_EMAIL, GET_OFFERING} from "./ActionsTypes";
import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import { addDoc, collection, getDocs, updateDoc, doc, query, limit, where } from 'firebase/firestore';
import Swal from "sweetalert2";


export const apdateStateUser = (inputs) => {

 
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        id: inputs.id,
        user: inputs.user,
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

export const apdateRoluser = (inputs) => {


  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'user');
      const userDocRef = doc(userCollection, inputs.id);

      // Crear un objeto con los datos actualizados
      const updatedData = {
        id: inputs.id,
        admin: inputs.admin,
        
       
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


export const getFilterporFecha = (inputfilter) => {
  
  return async (dispatch) => {
    try {
      const fechainicio = inputfilter.fechainicio
      const fechafin = inputfilter.fechafin
     
      const userCollection = collection(db, 'ofrendas');
 
      // Crea una consulta usando las fechas
      const dateFilter = query(
        userCollection,
        where('fechadeofrenda', '>=', fechainicio),
        where('fechadeofrenda', '<=', fechafin),
        limit(100)
      );

      const querySnapshot = await getDocs(dateFilter);

      const reportoffering = [];
      querySnapshot.forEach((doc) => {
        reportoffering.push({ id: doc.id, ...doc.data() });
      });
     if(reportoffering.length ===0){

      Swal.fire({
        icon: 'error',
        title: 'No ahi datos para mostrar en esta fecha',
        timerProgressBar: true,
        timer: 2000,
      });
     }

      dispatch({
        type: GET_OFFERING,
        payload: reportoffering,
      });
    } catch (error) {
      // Maneja los errores de manera adecuada, por ejemplo, puedes enviarlos a un servicio de registro de errores o mostrar un mensaje al usuario.
      console.error('Error fetching offering data:', error);
    }
  };
};


export const getReportOffering = () => {
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'ofrendas');

      const querySnapshot = await getDocs(query(userCollection, limit(100)));

      const reportoffering = [];
      querySnapshot.forEach((doc) => {
        reportoffering.push({ id: doc.id, ...doc.data() });
      });

      dispatch({
        type: GET_OFFERING,
        payload: reportoffering,
      });

  
    } catch (error) {
   
    }
  };
};


export const postOfferings = (offerings) => {
 
  return async (dispatch) => {
    try {
      const userCollection = collection(db, 'ofrendas');
      const newDocRef = await addDoc(userCollection, offerings);
      Swal.fire({
        icon: 'success',
        title: 'Gracias por tu Ofrenda',
        timerProgressBar: true,
        timer: 3000,
      });
      
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar la Ofrenda',
        timerProgressBar: true,
        timer: 3500,
      });
    }
  };
};






export const updateProfile = (inputs) => {


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
        telefono: inputs.telefono,
        direccion: inputs.direccion,
   
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










































