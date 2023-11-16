
import {
  
  GET_ALLUSER,
  GET_USER_BY_EMAIL,
  RESET_STATE
} from "./ActionsTypes";
let inicialState = {
  allUsers: [],
  UserProfileByEmail:[],
};
console.log("***************************",inicialState)

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {

    case RESET_STATE:
      return inicialState;

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
