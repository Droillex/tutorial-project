import { AuthAPI, ProfileAPI } from "../api/api";
import { closeModal } from "./modalReducer";

const SET_PROFILE_PHOTO = "authReducer/set-profile-photo";
const SET_AUTH_DATA = "authReducer/set-auth-data";
const SET_CAPTCHA = "authReducer/set-captcha";

// ------- ACTION CREATORS ----------

export const setAuthData = (userId, login, email, isAuth) => ({
  type: SET_AUTH_DATA,
  auth: {
    userId,
    login,
    email,
    isAuth,
  },
});

export const setUserPhoto = (photo) => ({
  type: SET_PROFILE_PHOTO,
  photo,
});

export const setCaptcha = (captcha) => ({
  type: SET_CAPTCHA,
  captcha,
});

// ------- THUNK CREATORS ----------

export const getAuthData = () => async (dispatch) => {
  const data = await AuthAPI.getAuth();
  if (data.resultCode === 0) {
    try {
      const userProfileData = await ProfileAPI.getProfile(data.data.id);
      dispatch(setUserPhoto(userProfileData.data.photos.small));
      dispatch(
        setAuthData(data.data.id, data.data.login, data.data.email, true)
      );
    } catch (e) {
      // handle error
    }
  }
};

export const loginUser = (data, actions) => async (dispatch) => {
  const response = await AuthAPI.postLogin(data);
  debugger;
  // result code = 10
  switch (response.data.resultCode) {
    case 0:
      dispatch(getAuthData());
      dispatch(setCaptcha(null));
      dispatch(closeModal());
      break;
    case 10:
      const capt = await AuthAPI.getCaptcha();
      dispatch(setCaptcha(capt.data.url));
      actions.setSubmitting(false);
      break;
    default:
      actions.setErrors(response.data.messages[0]);
      actions.setSubmitting(false);
      break;
  }
};

export const logout = () => async (dispatch) => {
  const response = await AuthAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthData(null, null, null, false));
  }
  //else error handler
};

const initState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,

  photo: null,
  captcha: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_AUTH_DATA:
      return { ...state, ...action.auth };
    case SET_PROFILE_PHOTO:
      return { ...state, photo: action.photo };
    case SET_CAPTCHA:
      return { ...state, captcha: action.captcha };
    default:
      return state;
  }
};

export default authReducer;
