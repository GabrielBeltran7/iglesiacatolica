/* eslint-disable no-unused-vars */
import { GET_SERVICIOS, GET_COLABORADORES, GET_PROYECTOS } from "./ActionsTypes";
import servicios from "./Servicios";
import Colaboradores from "./Colaboradores";
import Proyectos from "./Proyectos"



export const getProyectos =()=>{
return async (dispatch)=>{
  try {
    dispatch({
      type: GET_PROYECTOS,
      payload: Proyectos
    })
    
  } catch (error) {
    throw error;
  }
}

}

 export const getColaboradores =() =>{

  return async (dispatch) =>{
    try {
      dispatch({
        type: GET_COLABORADORES,
        payload:Colaboradores
      })
      
    } catch (error) {
      throw error;
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
