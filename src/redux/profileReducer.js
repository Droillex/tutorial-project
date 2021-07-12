import { ProfileAPI } from "../api/api";
import { toast } from "react-toastify";
import { setUserPhoto } from "./authReducer";

const ADD_POST = "profileReducer/add-post";
const SET_PROFILE_DATA = "profileReducer/set-profile-data";
const SET_USER_STATUS = "profileReducer/set-user-status";
const UPDATE_PROFILE_PHOTO = "profileReducer/set-profile-photo";

// -------- ACTION CREATORS ---------

export const addPost = (postText) => ({ type: ADD_POST, postText });
export const setProfileData = (profile) => {
  return {
    type: SET_PROFILE_DATA,
    profile,
  };
};
export const setUserStatus = (status) => ({
  type: SET_USER_STATUS,
  status,
});

export const setProfilePhoto = (photos) => ({
  type: UPDATE_PROFILE_PHOTO,
  photos,
});

// ------- THUNK CREATORS ----------
export const fetchProfile = (userId) => async (dispatch) => {
  dispatch(setProfileData(null));
  try {
    const data = await ProfileAPI.getProfile(userId);
    dispatch(setProfileData(data.data));
  } catch (e) {
    toast.error(`${e.message}`);
  }
};

export const getUserStatus = (userId) => async (dispatch) => {
  const data = await ProfileAPI.getUserStatus(userId);
  dispatch(setUserStatus(data));
};

export const updateUserStatus = (status) => async (dispatch) => {
  const data = await ProfileAPI.updateUserStatus(status);
  if (data.resultCode === 0) dispatch(setUserStatus(status));
};

export const updateProfilePhoto = (photoFile) => async (dispatch) => {
  const data = await ProfileAPI.updateProfilePhoto(photoFile);
  dispatch(setUserPhoto(data.photos.small));
  dispatch(setProfilePhoto(data.photos));
};

const initState = {
  profile: null,
  status: "",

  posts: [
    { text: "Hello there!", date: "24/04/21" },
    { text: "Started learning react", date: "24/04/21" },
    { text: "Fun thing btw, trying to progress fast", date: "24/04/21" },
    { text: "writing all data to store.js", date: "25/04/21" },
    {
      text: "road to redux: flux architecture, finished adding reducers",
      date: "26/04/21",
    },
    {
      text: "started redux, getting data via context provider",
      date: "27/04/21",
    },
    {
      text:
        "Forgot about posting. So much new exciting info : ajax, preloader, DAL, etc.",
      date: "29/04/21",
    },
  ],
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_POST: {
      if (action.postText === "") return state;
      return {
        ...state,
        posts: [...state.posts, { text: action.postText, date: "28/04/21" }],
      };
    }

    case SET_PROFILE_DATA:
      return { ...state, profile: action.profile };

    case SET_USER_STATUS:
      return { ...state, status: action.status };
    case UPDATE_PROFILE_PHOTO:
      return { ...state, profile: { ...state.profile, photos: action.photos } };
    default:
      return state;
  }
};

export default profileReducer;
