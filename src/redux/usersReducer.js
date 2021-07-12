import { UsersAPI } from "../api/api";
import { updateWithNewProps } from "../utils/objectHelpers";
import { toast } from "react-toastify";

const UNFOLLOW_USER = "usersReducer/unfollow-user";
const SET_CURRENT_PAGE = "usersReducer/set-current-page";
const FOLLOW_USER = "usersReducer/follow-user";
const SET_USER = "usersReducer/set-users";
const SET_USERS_COUNT = "usersReducer/set-users-count";
const TOGGLE_FETCHING = "usersReducer/toggle-fetching";
const DISABLE_USER = "usersReducer/disable-user";
const ENABLE_USER = "usersReducer/enable-user";

// ------------- ACTION CREATORS -------------
export const followSuccess = (user_id) => ({ type: FOLLOW_USER, user_id });
export const unfollowSuccess = (user_id) => ({
  type: UNFOLLOW_USER,
  user_id,
});
export const setUsers = (users) => ({ type: SET_USER, users });
export const setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  pageNumber,
});
export const setUsersCount = (count) => ({ type: SET_USERS_COUNT, count });
export const setFetch = (fetch) => ({ type: TOGGLE_FETCHING, fetch });
export const fetchingInProgress = (userId, isInProgress) => ({
  type: isInProgress ? DISABLE_USER : ENABLE_USER,
  userId,
});

// ------------- THUNK CREATORS-------------
export const fetchUsers = (currentPage, usersPerPage) => async (dispatch) => {
  const timeoutTime = 10000;
  dispatch(setFetch(true));
  while (true) {
    try {
      let data = await UsersAPI.getUsers(currentPage, usersPerPage);
      dispatch(setFetch(false));
      dispatch(setCurrentPage(currentPage));
      dispatch(setUsers(data.data.items));
      dispatch(setUsersCount(data.data.totalCount));
      break;
    } catch (e) {
      toast.error(
        `${e.message}, trying to fetch data again in ${timeoutTime / 1000} sec`
      );
      await timeout(timeoutTime);
    }
  }
};

const followUserFlow = async (dispatch, userId, methodAPI, AC) => {
  dispatch(fetchingInProgress(userId, true));
  let data = await methodAPI(userId);

  if (data.resultCode === 0) dispatch(AC(userId));
  dispatch(fetchingInProgress(userId, false));
};

export const followUser = (userId) => async (dispatch) => {
  await followUserFlow(dispatch, userId, UsersAPI.followUser, followSuccess);
};

export const unfollowUser = (userId) => async (dispatch) => {
  await followUserFlow(
    dispatch,
    userId,
    UsersAPI.unfollowUser,
    unfollowSuccess
  );
};

const initState = {
  users: [],
  disabledUsers: [],
  usersPerPage: 8,
  currentPage: 1,
  usersCount: 0,

  isFetching: false,
};

const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case FOLLOW_USER: {
      return {
        ...state,
        users: updateWithNewProps(state.users, "id", action.user_id, {
          followed: true,
        }),
      };
    }
    case UNFOLLOW_USER: {
      return {
        ...state,
        users: updateWithNewProps(state.users, "id", action.user_id, {
          followed: false,
        }),
      };
    }
    case SET_USER: {
      return {
        ...state,
        users: action.users,
      };
    }
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.pageNumber };

    case SET_USERS_COUNT:
      return { ...state, usersCount: action.count };

    case TOGGLE_FETCHING:
      return { ...state, isFetching: action.fetch };

    case DISABLE_USER:
      return {
        ...state,
        disabledUsers: [...state.disabledUsers, action.userId],
      };

    case ENABLE_USER:
      return {
        ...state,
        disabledUsers: state.disabledUsers.filter((id) => id !== action.userId),
      };

    default:
      return state;
  }
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default usersReducer;
