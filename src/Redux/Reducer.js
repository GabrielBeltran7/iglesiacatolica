
import {
  
  GET_ALLUSER,
  GET_USER_BY_EMAIL
} from "./ActionsTypes";
let inicialState = {
  allUsers: [],
  UserProfileByEmail:[],
};


const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

      case GET_ALLUSER:
        return {
          ...state,
          allUsers: action.payload,
        };

        case GET_USER_BY_EMAIL:
        return {
          ...state,
          UserProfileByEmail: action.payload,
        };
      default:
      return state;
  }
  
};

export default rootReducer;
