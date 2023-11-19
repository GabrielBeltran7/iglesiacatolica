
import {
  
  GET_ALLUSER,
  GET_USER_BY_EMAIL,
  RESET_STATE,
  GET_OFFERING
} from "./ActionsTypes";
let inicialState = {
  allUsers: [],
  UserProfileByEmail:[],
  allOffering:[],
};


const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case RESET_STATE:
      return inicialState;

      case GET_ALLUSER:
        return {
          ...state,
          allUsers: action.payload,
        };
        case GET_OFFERING:
        return {
          ...state,
          allOffering: action.payload,
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
