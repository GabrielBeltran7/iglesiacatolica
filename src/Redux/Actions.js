/* eslint-disable no-unused-vars */
import { GET_SERVICIOS } from "./ActionsTypes";
import { db } from "../../api/firebase/FirebaseConfig/FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";

export const postProfile =(user)=>{ 
console.log("999999999999999999999999", user)
  return async (dispatch)=>{ 
    try {
      const userCollection = collection(db, "user")
      await addDoc(userCollection, user)
    } catch (error) {
      console.error(error);
    }
   }
 }












































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
