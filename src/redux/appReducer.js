import { getAuthData } from "./authReducer";

const INITIALIZE_SUCCESS = "appReducer/initialize-success";

// ------- ACTION CREATORS ---------
export const setInitialize = () => {
  return { type: INITIALIZE_SUCCESS };
};

// ------ THUNK CREATORS -------
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthData());
  promise.then(() => {
    dispatch(setInitialize());
  });
};

const initState = {
  initialized: false,
};

const appReducer = (state = initState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export default appReducer;
