/* eslint-disable no-unused-vars */
/* eslint-disable no-fallthrough */
import {
  GET_SERVICIOS
  
} from "./ActionsTypes";
let inicialState = {
 
  userprofile: [],
  
  
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
      case GET_SERVICIOS:
        return {
          ...state,
          userprofile: action.payload,
        };
      default:
      return state;
  }
  
};

export default rootReducer;
