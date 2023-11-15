/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import {
  GET_SERVICIOS,
  GET_COLABORADORES,
  GET_PROYECTOS,
  
} from "./ActionsTypes";
let inicialState = {
 
  servicios: [],
  colaboradores:[],
  proyectos:[]
  
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
      case GET_PROYECTOS:
        return {
          ...state,
          proyectos: action.payload,
        };
      default:
      return state;
  }
  
};

export default rootReducer;
